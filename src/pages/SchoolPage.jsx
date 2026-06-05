import { useFamily } from '../context/FamilyContext';
import FamilySelector from '../components/FamilySelector';
import './SchoolPage.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIME_SLOTS = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

const MOCK_CLASSES = {
  'Mon-9:00': { subject: 'Math', student: 'Emma', color: '#3B82F6' },
  'Mon-10:00': { subject: 'Science', student: 'Emma', color: '#10B981' },
  'Mon-1:00': { subject: 'Piano', student: 'Emma', color: '#8B5CF6' },
  'Tue-9:00': { subject: 'English', student: 'Sam', color: '#F59E0B' },
  'Tue-11:00': { subject: 'Art', student: 'Sam', color: '#EC4899' },
  'Wed-9:00': { subject: 'Math', student: 'Emma', color: '#3B82F6' },
  'Wed-10:00': { subject: 'History', student: 'Emma', color: '#14B8A6' },
  'Wed-2:00': { subject: 'Soccer Practice', student: 'Sam', color: '#F97316' },
  'Thu-9:00': { subject: 'Science', student: 'Emma', color: '#10B981' },
  'Thu-11:00': { subject: 'English', student: 'Sam', color: '#F59E0B' },
  'Fri-9:00': { subject: 'Math', student: 'Emma', color: '#3B82F6' },
  'Fri-1:00': { subject: 'Music Theory', student: 'Emma', color: '#8B5CF6' },
};

export default function SchoolPage() {
  const { members, activeMember } = useFamily();

  return (
    <div className="school-page">
      <div className="school-header">
        <h1 className="school-title">📚 School Schedule</h1>
      </div>

      <FamilySelector />

      <div className="schedule-grid">
        <div className="schedule-header">
          <div className="schedule-time-header"></div>
          {DAYS.map(day => (
            <div key={day} className="schedule-day-header">{day}</div>
          ))}
        </div>

        {TIME_SLOTS.map(time => (
          <div key={time} className="schedule-row">
            <div className="schedule-time">{time}</div>
            {DAYS.map(day => {
              const key = `${day}-${time}`;
              const cls = MOCK_CLASSES[key];
              return (
                <div key={key} className="schedule-cell">
                  {cls && (
                    <div className="class-block" style={{ background: cls.color + '22', borderLeftColor: cls.color, color: cls.color }}>
                      <span className="class-subject">{cls.subject}</span>
                      <span className="class-student">{cls.student}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Practice Log */}
      <section className="practice-section">
        <h2 className="section-title">🎵 Practice Log</h2>
        <div className="practice-cards">
          {members.filter(m => m.role === 'child').map(member => (
            <div key={member.id} className="practice-card">
              <div className="practice-avatar" style={{ background: member.color }}>
                {member.avatar}
              </div>
              <div className="practice-info">
                <div className="practice-name">{member.name}</div>
                <div className="practice-stat">
                  <span className="practice-label">Piano</span>
                  <div className="practice-progress">
                    <div className="practice-bar" style={{ width: '75%', background: member.color }}></div>
                  </div>
                  <span className="practice-mins">45/60 min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}