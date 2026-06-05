import './SkeletonLoader.css';

export function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line skeleton-line-title" />
      <div className="skeleton-line skeleton-line-text" />
      <div className="skeleton-line skeleton-line-text short" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-list-item">
          <div className="skeleton-circle" />
          <div className="skeleton-lines">
            <div className="skeleton-line skeleton-line-title" />
            <div className="skeleton-line skeleton-line-text short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="skeleton-calendar">
      <div className="skeleton-calendar-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="skeleton-calendar-day-name">{d}</div>
        ))}
      </div>
      <div className="skeleton-calendar-grid">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="skeleton-calendar-cell">
            <div className="skeleton-line skeleton-line-number" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="skeleton-stats">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton-stat-card">
          <div className="skeleton-line skeleton-line-number" />
          <div className="skeleton-line skeleton-line-label" />
        </div>
      ))}
    </div>
  );
}