import { useFamily } from '../context/FamilyContext';
import './FamilySelector.css';

export default function FamilySelector() {
  const { members, activeMember, setActiveMember } = useFamily();

  return (
    <div className="family-selector">
      <button
        className={`family-chip ${!activeMember ? 'active' : ''}`}
        onClick={() => setActiveMember(null)}
      >
        <span className="chip-avatar all">✦</span>
        <span className="chip-name">All</span>
      </button>
      {members.map(m => (
        <button
          key={m.id}
          className={`family-chip ${activeMember === m.id ? 'active' : ''}`}
          onClick={() => setActiveMember(activeMember === m.id ? null : m.id)}
          style={activeMember === m.id ? { background: m.color } : {}}
        >
          <span className="chip-avatar" style={{ background: m.color }}>
            {m.avatar}
          </span>
          <span className="chip-name">{m.name}</span>
        </button>
      ))}
    </div>
  );
}