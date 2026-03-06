import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { GetStarted } from './pages/GetStarted';
import { Foundations } from './pages/Foundations';
import { Components } from './pages/Components';
import { Examples } from './pages/Examples';
import { ButtonDocs } from './pages/components/ButtonDocs';
import { InputDocs } from './pages/components/InputDocs';
import { CardDocs } from './pages/components/CardDocs';
import { ColorsDocs } from './pages/foundations/ColorsDocs';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/foundations" element={<Foundations />} />
            <Route path="/foundations/colors" element={<ColorsDocs />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/button" element={<ButtonDocs />} />
            <Route path="/components/input" element={<InputDocs />} />
            <Route path="/components/card" element={<CardDocs />} />
            <Route path="/examples" element={<Examples />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
