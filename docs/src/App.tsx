import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { GetStarted } from './pages/GetStarted';
import { Foundations } from './pages/Foundations';
import { Components } from './pages/Components';
import { Examples } from './pages/Examples';
import { Patterns } from './pages/Patterns';
import { SidebarPatternDocs } from './pages/patterns/SidebarPatternDocs';
import { CommandPatternDocs } from './pages/patterns/CommandPatternDocs';
import { SheetPatternDocs } from './pages/patterns/SheetPatternDocs';
import { TransactionListExample } from './pages/examples/TransactionListExample';
import { ButtonDocs } from './pages/components/ButtonDocs';
import { InputDocs } from './pages/components/InputDocs';
import { CardDocs } from './pages/components/CardDocs';
import { AccordionDocs } from './pages/components/AccordionDocs';
import { AlertDialogDocs } from './pages/components/AlertDialogDocs';
import { AvatarDocs } from './pages/components/AvatarDocs';
import { BadgeDocs } from './pages/components/BadgeDocs';
import { BreadcrumbsDocs } from './pages/components/BreadcrumbsDocs';
import { CalendarDocs } from './pages/components/CalendarDocs';
import { ChartDocs } from './pages/components/ChartDocs';
import { CheckboxDocs } from './pages/components/CheckboxDocs';
import { DatePickerDocs } from './pages/components/DatePickerDocs';
import { DataTableDocs } from './pages/components/DataTableDocs';
import { DropdownDocs } from './pages/components/DropdownDocs';
import { LinkDocs } from './pages/components/LinkDocs';
import { MenubarDocs } from './pages/components/MenubarDocs';
import { PaginationDocs } from './pages/components/PaginationDocs';
import { RadioButtonDocs } from './pages/components/RadioButtonDocs';
import { SelectDocs } from './pages/components/SelectDocs';
import { TabsDocs } from './pages/components/TabsDocs';
import { ToastDocs } from './pages/components/ToastDocs';
import { TooltipsDocs } from './pages/components/TooltipsDocs';
import { ProgressBarDocs } from './pages/components/ProgressBarDocs';
import { SearchDocs } from './pages/components/SearchDocs';
import { ColorsDocs } from './pages/foundations/ColorsDocs';
import { IconsDocs } from './pages/foundations/IconsDocs';
import { TypographyDocs } from './pages/foundations/TypographyDocs';
import { SpacingDocs } from './pages/foundations/SpacingDocs';
import { ThemesDocs } from './pages/foundations/ThemesDocs';
import { ElevationDocs } from './pages/foundations/ElevationDocs';
import { Toaster } from './components/ui/sonner';

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
            <Route path="/foundations/icons" element={<IconsDocs />} />
            <Route path="/foundations/typography" element={<TypographyDocs />} />
            <Route path="/foundations/spacing" element={<SpacingDocs />} />
            <Route path="/foundations/themes" element={<ThemesDocs />} />
            <Route path="/foundations/elevation" element={<ElevationDocs />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/button" element={<ButtonDocs />} />
            <Route path="/components/input" element={<InputDocs />} />
            <Route path="/components/card" element={<CardDocs />} />
            <Route path="/components/accordion" element={<AccordionDocs />} />
            <Route path="/components/alert-dialog" element={<AlertDialogDocs />} />
            <Route path="/components/avatar" element={<AvatarDocs />} />
            <Route path="/components/badge" element={<BadgeDocs />} />
            <Route path="/components/breadcrumbs" element={<BreadcrumbsDocs />} />
            <Route path="/components/calendar" element={<CalendarDocs />} />
            <Route path="/components/chart" element={<ChartDocs />} />
            <Route path="/components/checkbox" element={<CheckboxDocs />} />
            <Route path="/components/date-picker" element={<DatePickerDocs />} />
            <Route path="/components/data-table" element={<DataTableDocs />} />
            <Route path="/components/dropdown" element={<DropdownDocs />} />
            <Route path="/components/link" element={<LinkDocs />} />
            <Route path="/components/menubar" element={<MenubarDocs />} />
            <Route path="/components/pagination" element={<PaginationDocs />} />
            <Route path="/components/radio-button" element={<RadioButtonDocs />} />
            <Route path="/components/tabs" element={<TabsDocs />} />
            <Route path="/components/tooltips" element={<TooltipsDocs />} />
            <Route path="/components/progress-bar" element={<ProgressBarDocs />} />
            <Route path="/components/search" element={<SearchDocs />} />
            <Route path="/components/select" element={<SelectDocs />} />
            <Route path="/components/toast" element={<ToastDocs />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/patterns/sidebar" element={<SidebarPatternDocs />} />
            <Route path="/patterns/command" element={<CommandPatternDocs />} />
            <Route path="/patterns/sheet" element={<SheetPatternDocs />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/examples/transaction-list" element={<TransactionListExample />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
