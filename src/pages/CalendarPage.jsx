import { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import FamilySelector from '../components/FamilySelector';
import { CalendarSkeleton } from '../components/SkeletonLoader';
import './CalendarPage.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const MOCK_CALENDAR_EVENTS = {
  3: [{ title: 'Piano Lesson', color: '#10B981', time: '4:00 PM' }],
  7: [{ title: 'Team Practice', color: '#3B82F6', time: '3:30 PM' }],
  10: [{ title: 'Dentist', color: '#EC4899', time: '10:00 AM' }],
  14: [{ title: 'Book Club', color: '#8B5CF6', time: '6:00 PM' }],
  18: [{ title: 'Science Fair', color: '#F59E0B', time: '9:00 AM' }],
  21: [{ title: 'Family BBQ', color: '#EF4444', time: '12:00 PM' }, { title: 'Soccer Game', color: '#3B82F6', time: '4:00 PM' }],
  25: [{ title: 'Movie Night', color: '#EC4899', time: '7:00 PM' }],
  28: [{ title: 'Grocery Run', color: '#14B8A6', time: '10:00 AM' }],
};

export default function CalendarPage() {
  const { members, activeMember } = useFamily();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const isToday = (d) =>
    d && today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  const isSelected = (d) => d && selectedDate?.getDate() === d && selectedDate?.getMonth() === month;

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
          <h2 className="calendar-month">{MONTHS[month]} {year}</h2>
          <button className="cal-nav-btn" onClick={nextMonth}>›</button>
        </div>
        <div className="calendar-views">
          {['month', 'week', 'day'].map(v => (
            <button
              key={v}
              className={`view-btn ${view === v ? 'active' : ''}`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <FamilySelector />

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <div className="calendar-grid">
          <div className="calendar-days-header">
            {DAYS.map(day => (
              <div key={day} className="calendar-day-name">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((d, i) => (
              <div
                key={i}
                className={`calendar-day ${d ? 'has-date' : 'empty'} ${isToday(d) ? 'today' : ''} ${isSelected(d) ? 'selected' : ''}`}
                onClick={() => d && setSelectedDate(new Date(year, month, d))}
              >
                {d && (
                  <>
                    <span className="day-number">{d}</span>
                    {MOCK_CALENDAR_EVENTS[d] && (
                      <div className="day-events">
                        {MOCK_CALENDAR_EVENTS[d].slice(0, 2).map((ev, ei) => (
                          <div key={ei} className="day-event" style={{ background: ev.color + '22', color: ev.color, borderLeft: `3px solid ${ev.color}` }}>
                            <span className="day-event-title">{ev.title}</span>
                          </div>
                        ))}
                        {MOCK_CALENDAR_EVENTS[d].length > 2 && (
                          <span className="day-more">+{MOCK_CALENDAR_EVENTS[d].length - 2} more</span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Day Detail */}
      {selectedDate && (
        <div className="selected-day-panel">
          <h3 className="selected-day-title">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          {MOCK_CALENDAR_EVENTS[selectedDate.getDate()] ? (
            <div className="selected-day-events">
              {MOCK_CALENDAR_EVENTS[selectedDate.getDate()].map((ev, i) => (
                <div key={i} className="selected-event" style={{ borderLeftColor: ev.color }}>
                  <span className="selected-event-time">{ev.time}</span>
                  <span className="selected-event-title">{ev.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">No events scheduled</p>
          )}
        </div>
      )}
    </div>
  );
}