import './EventCard.css';

export default function EventCard({ event, member }) {
  const memberColor = member?.color || 'var(--color-text-tertiary)';
  const startTime = event.start_time || event.start_date?.slice(11, 16) || '';
  const endTime = event.end_time || event.end_date?.slice(11, 16) || '';

  return (
    <div className="event-card" style={{ borderLeftColor: memberColor }}>
      <div className="event-time">
        {startTime && <span>{startTime}</span>}
        {endTime && <span className="time-sep">–</span>}
        {endTime && <span>{endTime}</span>}
      </div>
      <div className="event-content">
        <div className="event-title">{event.title}</div>
        {event.location && (
          <div className="event-location">📍 {event.location}</div>
        )}
        {member && (
          <div className="event-member" style={{ color: memberColor }}>
            <span className="member-dot" style={{ background: memberColor }} />
            {member.name}
          </div>
        )}
      </div>
    </div>
  );
}