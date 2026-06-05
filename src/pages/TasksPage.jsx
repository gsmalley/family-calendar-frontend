import { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import FamilySelector from '../components/FamilySelector';
import TaskCard from '../components/TaskCard';
import { ListSkeleton } from '../components/SkeletonLoader';
import { statusLabel } from '../utils/helpers';
import './TasksPage.css';

const MOCK_TASKS = [
  { id: '1', title: 'Math Homework Chapter 5', priority: 'p1', status: 'in_progress', description: 'Complete problems 1-20 on page 127', due_date: new Date().toISOString(), labels: ['homework', 'math'], memberId: '3' },
  { id: '2', title: 'Clean Room', priority: 'p2', status: 'backlog', description: 'Tidy up before dinner', labels: ['chore'], memberId: '3' },
  { id: '3', title: 'Science Project Research', priority: 'p2', status: 'backlog', description: 'Find 3 sources for the volcano project', labels: ['homework', 'science'], memberId: '4' },
  { id: '4', title: 'Grocery Shopping', priority: 'p2', status: 'todo', description: 'Get items from the weekly list', labels: ['errand'], memberId: '2' },
  { id: '5', title: 'Piano Practice', priority: 'p3', status: 'todo', description: '30 minutes of scales and new piece', labels: ['music'], memberId: '3' },
  { id: '6', title: 'Fix Kitchen Sink', priority: 'p1', status: 'backlog', description: 'Leaky faucet needs new washer', labels: ['home'], memberId: '1' },
  { id: '7', title: 'Book Library Return', priority: 'p3', status: 'done', description: 'Return books before overdue date', labels: ['errand'], memberId: '4' },
  { id: '8', title: 'Meal Prep Sunday', priority: 'p2', status: 'todo', description: 'Prep lunches for the week', labels: ['meal', 'planning'], memberId: '2' },
];

const STATUSES = [
  { id: 'backlog', label: 'Backlog', icon: '📋' },
  { id: 'todo', label: 'To Do', icon: '📌' },
  { id: 'in_progress', label: 'In Progress', icon: '🔄' },
  { id: 'done', label: 'Done', icon: '✅' },
];

export default function TasksPage() {
  const { members, activeMember } = useFamily();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredTasks = MOCK_TASKS.filter(t => {
    if (activeMember && t.memberId !== activeMember) return false;
    if (filter !== 'all' && t.status !== filter) return false;
    return true;
  });

  const grouped = STATUSES.map(s => ({
    ...s,
    tasks: filteredTasks.filter(t => t.status === s.id),
  }));

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1 className="tasks-title">Tasks</h1>
        <button className="add-task-btn">+ Add Task</button>
      </div>

      <FamilySelector />

      <div className="task-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {STATUSES.map(s => (
          <button
            key={s.id}
            className={`filter-btn ${filter === s.id ? 'active' : ''}`}
            onClick={() => setFilter(s.id)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <ListSkeleton count={5} />
      ) : filter === 'all' ? (
        <div className="task-columns">
          {grouped.map(group => (
            <div key={group.id} className="task-column">
              <h3 className="column-header">
                <span className="column-icon">{group.icon}</span>
                {group.label}
                <span className="column-count">{group.tasks.length}</span>
              </h3>
              <div className="column-tasks">
                {group.tasks.length > 0 ? (
                  group.tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      member={members.find(m => m.id === task.memberId)}
                    />
                  ))
                ) : (
                  <div className="empty-column">No tasks</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="task-list-view">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                member={members.find(m => m.id === task.memberId)}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🎉</span>
              <p>No tasks match this filter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}