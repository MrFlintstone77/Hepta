import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');

// Ensure dist exists
if (!existsSync(distPath)) mkdirSync(distPath, { recursive: true });

// Base config - builds light theme
const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'hepta',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

// Build tokens.manifest.json with light/dark and descriptions
// Style Dictionary doesn't natively support dark variants, so we process the source
const primitive = JSON.parse(readFileSync(join(__dirname, 'src/primitive.json'), 'utf-8'));
const semantic = JSON.parse(readFileSync(join(__dirname, 'src/semantic.json'), 'utf-8'));

function deepMerge(a, b) {
  const out = { ...a };
  for (const k of Object.keys(b)) {
    if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && b[k].value === undefined && b[k].dark === undefined)
      out[k] = deepMerge(out[k] || {}, b[k]);
    else out[k] = b[k];
  }
  return out;
}

function resolveRef(merged, ref) {
  const path = ref.replace(/[{}]/g, '').split('.');
  let current = merged;
  for (const p of path) {
    current = current?.[p];
    if (!current) return undefined;
    if (current.value !== undefined)
      return typeof current.value === 'string' && current.value.startsWith('{') ? resolveRef(merged, current.value) : current.value;
  }
  return undefined;
}

const merged = deepMerge(primitive, semantic);

function flattenTokens(obj, prefix = '', result = {}) {
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      const desc = val.$description;
      const lightVal = typeof val.value === 'string' && val.value.startsWith('{')
        ? resolveRef(merged, val.value) ?? val.value
        : val.value;
      const darkVal = val.dark
        ? (typeof val.dark === 'string' && val.dark.startsWith('{')
            ? resolveRef(merged, val.dark) ?? val.dark
            : val.dark)
        : lightVal;
      result[path] = { value: lightVal, light: lightVal, dark: darkVal, description: desc || '' };
    } else if (val && typeof val === 'object') {
      flattenTokens(val, path, result);
    }
  }
  return result;
}

const manifest = {
  tokens: flattenTokens(semantic),
  categories: ['color', 'typography', 'spacing', 'radius', 'shadow', 'motion'],
};

// Add primitive tokens to manifest
function addPrimitives(obj, prefix = '') {
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      manifest.tokens[path] = {
        value: val.value,
        light: val.value,
        dark: val.value,
        description: val.$description || '',
      };
    } else if (val && typeof val === 'object') {
      addPrimitives(val, path);
    }
  }
}
addPrimitives(primitive);

writeFileSync(join(distPath, 'tokens.manifest.json'), JSON.stringify(manifest, null, 2));

// Append dark theme overrides to tokens.css
const darkOverrides = [];
for (const [name, meta] of Object.entries(manifest.tokens)) {
  if (meta.dark && meta.dark !== meta.light) {
    const cssVar = `--hepta-${name.replace(/\./g, '-')}`;
    darkOverrides.push(`  ${cssVar}: ${meta.dark};`);
  }
}

if (darkOverrides.length > 0) {
  const cssPath = join(distPath, 'tokens.css');
  const existingCss = readFileSync(cssPath, 'utf-8');
  const darkBlock = `\n[data-theme="dark"] {\n${darkOverrides.join('\n')}\n}\n`;
  writeFileSync(cssPath, existingCss + darkBlock);
}

console.log('Tokens built successfully to dist/');
