import { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import FamilySelector from '../components/FamilySelector';
import './MealsPage.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const MOCK_MEALS = {
  'Mon-Breakfast': [{ title: 'Oatmeal with Berries', color: '#3B82F6' }],
  'Mon-Dinner': [{ title: 'Spaghetti Bolognese', color: '#EC4899' }],
  'Tue-Lunch': [{ title: 'Grilled Chicken Salad', color: '#10B981' }],
  'Wed-Breakfast': [{ title: 'Smoothie Bowl', color: '#F59E0B' }],
  'Wed-Dinner': [{ title: 'Tacos', color: '#EF4444' }],
  'Thu-Lunch': [{ title: 'Soup & Sandwich', color: '#8B5CF6' }],
  'Fri-Dinner': [{ title: 'Pizza Night 🍕', color: '#F97316' }],
  'Sat-Breakfast': [{ title: 'Pancakes', color: '#14B8A6' }],
  'Sat-Dinner': [{ title: 'BBQ', color: '#3B82F6' }],
  'Sun-Dinner': [{ title: 'Roast Chicken', color: '#EC4899' }],
};

export default function MealsPage() {
  const { members, activeMember } = useFamily();
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="meals-page">
      <div className="meals-header">
        <h1 className="meals-title">🍽️ Meal Planning</h1>
        <div className="meals-nav">
          <button className="meals-nav-btn" onClick={() => setWeekOffset(weekOffset - 1)}>‹</button>
          <span className="meals-week-label">This Week</span>
          <button className="meals-nav-btn" onClick={() => setWeekOffset(weekOffset + 1)}>›</button>
        </div>
      </div>

      <FamilySelector />

      <div className="meals-grid">
        <div className="meals-grid-header">
          <div className="meals-type-header"></div>
          {DAYS.map(day => (
            <div key={day} className="meals-day-header">{day}</div>
          ))}
        </div>

        {MEAL_TYPES.map(type => (
          <div key={type} className="meals-row">
            <div className="meals-type-label">{type}</div>
            {DAYS.map(day => {
              const key = `${day}-${type}`;
              const meals = MOCK_MEALS[key] || [];
              return (
                <div key={key} className="meals-cell">
                  {meals.map((meal, i) => (
                    <div key={i} className="meal-item" style={{ borderLeftColor: meal.color }}>
                      {meal.title}
                    </div>
                  ))}
                  {!meals.length && (
                    <button className="add-meal-btn">+</button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}