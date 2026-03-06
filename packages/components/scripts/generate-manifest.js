import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

if (!existsSync(distPath)) mkdirSync(distPath, { recursive: true });

const manifest = {
  components: [
    {
      name: 'Button',
      importPath: '@pariogo/components',
      props: [
        { name: 'variant', type: 'ButtonVariant', default: "'primary'", description: 'Visual style variant' },
        { name: 'size', type: 'ButtonSize', default: "'md'", description: 'Size of the button' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
      ],
      variants: ['primary', 'secondary', 'outline', 'ghost'],
      sizes: ['sm', 'md', 'lg'],
      usageExample: `import { Button } from '@pariogo/components';

<Button variant="primary" onClick={handleClick}>Save</Button>`,
    },
    {
      name: 'Input',
      importPath: '@pariogo/components',
      props: [
        { name: 'label', type: 'string', default: 'undefined', description: 'Label displayed above the input' },
        { name: 'error', type: 'string', default: 'undefined', description: 'Error message - shows error state when present' },
      ],
      usageExample: `import { Input } from '@pariogo/components';

<Input label="Email" placeholder="you@example.com" />`,
    },
    {
      name: 'Card',
      importPath: '@pariogo/components',
      props: [
        { name: 'title', type: 'string', default: 'undefined', description: 'Optional card title shown in header' },
        { name: 'variant', type: 'CardVariant', default: "'default'", description: 'Visual variant' },
      ],
      variants: ['default', 'elevated'],
      usageExample: `import { Card } from '@pariogo/components';

<Card title="Settings">Content here</Card>`,
    },
  ],
};

writeFileSync(join(distPath, 'components.manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Component manifest generated');
