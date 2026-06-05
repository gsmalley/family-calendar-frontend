import { createContext, useContext, useState, useEffect } from 'react';

const FamilyContext = createContext(null);

const DEFAULT_MEMBERS = [
  { id: '1', name: 'Dad', color: '#3B82F6', avatar: '👨', role: 'parent' },
  { id: '2', name: 'Mom', color: '#EC4899', avatar: '👩', role: 'parent' },
  { id: '3', name: 'Emma', color: '#10B981', avatar: '👧', role: 'child' },
  { id: '4', name: 'Sam', color: '#F59E0B', avatar: '👦', role: 'child' },
];

export function FamilyProvider({ children }) {
  const [members] = useState(DEFAULT_MEMBERS);
  const [activeMember, setActiveMember] = useState(null); // null = all
  const [currentView, setCurrentView] = useState('home');

  return (
    <FamilyContext.Provider value={{
      members,
      activeMember,
      setActiveMember,
      currentView,
      setCurrentView,
    }}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamily must be used within FamilyProvider');
  return ctx;
}