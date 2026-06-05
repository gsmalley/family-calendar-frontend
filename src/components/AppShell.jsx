import { useFamily } from '../context/FamilyContext';
import './AppShell.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'tasks', label: 'Tasks', icon: '✅' },
  { id: 'meals', label: 'Meals', icon: '🍽️' },
  { id: 'school', label: 'School', icon: '📚' },
];

export default function AppShell({ children }) {
  const { currentView, setCurrentView } = useFamily();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-left">
          <span className="app-logo">📅</span>
          <h1 className="app-title">Family Calendar</h1>
        </div>
        <nav className="header-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="header-right">
          <button className="icon-btn" title="Notifications">🔔</button>
          <button className="icon-btn" title="Settings">⚙️</button>
        </div>
      </header>

      <main className="app-main">
        {children}
      </main>

      <nav className="mobile-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}