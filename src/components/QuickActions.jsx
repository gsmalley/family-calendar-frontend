import './QuickActions.css';

const ACTIONS = [
  { id: 'add-event', label: 'Add Event', icon: '📅', color: 'var(--color-primary)' },
  { id: 'add-task', label: 'Add Task', icon: '✅', color: 'var(--color-success)' },
  { id: 'plan-meal', label: 'Plan Meal', icon: '🍽️', color: 'var(--color-warning)' },
  { id: 'log-practice', label: 'Log Practice', icon: '🎵', color: 'var(--color-member-5)' },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="quick-actions">
      {ACTIONS.map(action => (
        <button
          key={action.id}
          className="quick-action-btn"
          onClick={() => onAction?.(action.id)}
        >
          <span className="quick-action-icon" style={{ background: action.color }}>
            {action.icon}
          </span>
          <span className="quick-action-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
}