export function formatDate(date, style = 'long') {
  const d = new Date(date);
  const opts = {
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    short: { month: 'short', day: 'numeric' },
    time: { hour: 'numeric', minute: '2-digit' },
    full: { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' },
  };
  return d.toLocaleDateString('en-US', opts[style] || opts.long);
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function getRelativeDay(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((d.setHours(0,0,0,0) - now.setHours(0,0,0,0)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return formatDate(date, 'short');
}

export function getMemberColor(memberId) {
  const colors = {
    '1': '#3B82F6', '2': '#EC4899', '3': '#10B981', '4': '#F59E0B',
  };
  return colors[memberId] || '#64748B';
}

export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function priorityLabel(priority) {
  const map = { p1: 'High', p2: 'Medium', p3: 'Low' };
  return map[priority] || priority;
}

export function priorityColor(priority) {
  const map = { p1: 'var(--color-danger)', p2: 'var(--color-warning)', p3: 'var(--color-success)' };
  return map[priority] || 'var(--color-text-tertiary)';
}

export function statusLabel(status) {
  return status?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Unknown';
}

export function useCurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return time;
}

import { useState, useEffect } from 'react';

export function useScreenSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  const isTV = size.width >= 1024;

  return { ...size, isMobile, isTablet, isTV };
}