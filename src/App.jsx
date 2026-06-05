import { FamilyProvider, useFamily } from './context/FamilyContext';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import TasksPage from './pages/TasksPage';
import MealsPage from './pages/MealsPage';
import SchoolPage from './pages/SchoolPage';
import './styles/global.css';

function AppContent() {
  const { currentView } = useFamily();

  const pages = {
    home: <HomePage />,
    calendar: <CalendarPage />,
    tasks: <TasksPage />,
    meals: <MealsPage />,
    school: <SchoolPage />,
  };

  return (
    <AppShell>
      {pages[currentView] || <HomePage />}
    </AppShell>
  );
}

export default function App() {
  return (
    <FamilyProvider>
      <AppContent />
    </FamilyProvider>
  );
}