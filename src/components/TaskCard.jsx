import './TaskCard.css';
import { priorityLabel, priorityColor } from '../utils/helpers';

export default function TaskCard({ task, member }) {
  const memberColor = member?.color || 'var(--color-text-tertiary)';

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-header">
        <span className="task-priority" style={{ color: priorityColor(task.priority) }}>
          {priorityLabel(task.priority)}
        </span>
        {member && (
          <span className="task-member" style={{ color: memberColor }}>
            <span className="member-dot" style={{ background: memberColor }} />
            {member.name}
          </span>
        )}
      </div>
      <div className="task-title">{task.title}</div>
      {task.description && (
        <div className="task-desc">{task.description.slice(0, 100)}</div>
      )}
      {task.due_date && (
        <div className="task-due">Due: {new Date(task.due_date).toLocaleDateString()}</div>
      )}
      {task.labels?.length > 0 && (
        <div className="task-labels">
          {task.labels.map((l, i) => (
            <span key={i} className="task-label">{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}