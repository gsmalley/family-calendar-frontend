import { useState, useEffect } from 'react';
import { useFamily } from '../context/FamilyContext';
import { api } from '../utils/api';
import FamilySelector from '../components/FamilySelector';
import EventCard from '../components/EventCard';
import TaskCard from '../components/TaskCard';
import QuickActions from '../components/QuickActions';
import { StatsSkeleton, ListSkeleton } from '../components/SkeletonLoader';
import { formatDate, formatTime } from '../utils/helpers';
import './HomePage.css';

const MOCK_EVENTS = [
  { id: '1', title: 'Team Practice', start_date: new Date().toISOString(), end_date: new Date(Date.now() + 3600000).toISOString(), location: 'Gym', category: 'sports' },
  { id: '2', title: 'Piano Lesson', start_date: new Date(Date.now() + 7200000).toISOString(), end_date: new Date(Date.now() + 10800000).toISOString(), location: 'Music Room', category: 'music' },
  { id: '3', title: 'Family Dinner', start_date: new Date(Date.now() + 54000000).toISOString(), end_date: new Date(Date.now() + 57600000).toISOString(), location: 'Home', category: 'meal' },
];

const MOCK_TASKS = [
  { id: '1', title: 'Math Homework Chapter 5', priority: 'p1', description: 'Complete problems 1-20', due_date: new Date().toISOString(), labels: ['homework'] },
  { id: '2', title: 'Clean Room', priority: 'p2', description: 'Tidy up before dinner', labels: ['chore'] },
  { id: '3', title: 'Science Project Research', priority: 'p2', description: 'Find 3 sources for the volcano project', labels: ['homework', 'science'] },
];

export default function HomePage() {
  const { members, activeMember } = useFamily();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [tasks, setTasks] = useState(MOCK_TASKS);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  const filteredEvents = activeMember
    ? events.filter(e => e.memberId === activeMember)
    : events;

  const filteredTasks = activeMember
    ? tasks.filter(t => t.memberId === activeMember)
    : tasks;

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h1 className="home-greeting">{greeting} 👋</h1>
          <p className="home-date">{formatDate(now)}</p>
        </div>
        <div className="home-weather">
          <span className="weather-icon">☀️</span>
          <span className="weather-temp">78°F</span>
        </div>
      </div>

      <FamilySelector />

      <QuickActions onAction={(id) => console.log('Action:', id)} />

      {/* Happening Now */}
      <section className="home-section">
        <h2 className="section-title">
          <span className="section-icon">🔴</span> Happening Now
        </h2>
        {loading ? (
          <ListSkeleton count={2} />
        ) : filteredEvents.length > 0 ? (
          <div className="event-list">
            {filteredEvents.slice(0, 3).map(event => (
              <EventCard
                key={event.id}
                event={event}
                member={members.find(m => m.id === event.memberId)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No events happening right now</p>
          </div>
        )}
      </section>

      {/* Today's Tasks */}
      <section className="home-section">
        <h2 className="section-title">
          <span className="section-icon">✅</span> Today's Tasks
        </h2>
        {loading ? (
          <ListSkeleton count={3} />
        ) : filteredTasks.length > 0 ? (
          <div className="task-list">
            {filteredTasks.slice(0, 4).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                member={members.find(m => m.id === task.memberId)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">🎉</span>
            <p>All caught up! No tasks for today.</p>
          </div>
        )}
      </section>
    </div>
  );
}