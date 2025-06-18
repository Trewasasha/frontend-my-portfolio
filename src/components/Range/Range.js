import React from 'react';
import './Range.css';

const Range = ({ onTimeChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleChange = (e) => {
    const hours = parseInt(e.target.value, 10);
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(0);
    onTimeChange(newTime);
    
  };

  return (
    <div className="ruler-container">
      <div className="ruler">
        {hours.map((hour) => (
          <div key={hour} className="ruler-tick" />
        ))}
      </div>
      <input
        type="range"
        min="0"
        max="23"
        step="1"
        onChange={handleChange}
        className="ruler-slider"
      />
    </div>
  );
};

export default Range;
