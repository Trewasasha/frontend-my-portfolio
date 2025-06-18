import React, { useEffect, useState } from 'react';
import { useBg } from '../../hooks/useBg';
import './Background.css';

const Background = ({ time }) => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const isNight = time.getHours() < 5 || time.getHours() >= 19;

    if (isNight) {
      const newStars = Array.from({ length: 100 }, () => ({
        id: Math.random().toString(36).substr(2, 9),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        duration: `${Math.random() * 3 + 1}s`,
        delay: `${Math.random() * 5}s`
      }));
      setStars(newStars);

      const newMeteors = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
        id: Math.random().toString(36).substr(2, 9),
        left: Math.random() * 100,
        top: -10,
        angle: Math.random() * 30 + 20,
        duration: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 10}s`
      }));
      setMeteors(newMeteors);
    } else {
      setStars([]);
      setMeteors([]);
    }
  }, [time]);

  useEffect(() => {
    if (meteors.length > 0) {
      const meteorInterval = setInterval(() => {
        const newMeteors = Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => ({
          id: Math.random().toString(36).substr(2, 9),
          left: Math.random() * 100,
          top: -10,
          angle: Math.random() * 30 + 20,
          duration: `${Math.random() * 3 + 2}s`,
          delay: `${Math.random() * 5}s`
        }));
        setMeteors(prev => [...prev, ...newMeteors].slice(-5));
      }, 10000 + Math.random() * 5000);

      return () => clearInterval(meteorInterval);
    }
  }, [meteors.length]);

  const { timeOfDay } = useBg(time); 

  return (
    <div className={`background ${timeOfDay}-gradient`}>
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            '--duration': star.duration,
            '--delay': star.delay
          }}
        />
      ))}
      {meteors.map(meteor => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            left: `${meteor.left}%`,
            top: `${meteor.top}%`,
            '--angle': `${meteor.angle}deg`,
            '--duration': meteor.duration,
            '--delay': meteor.delay
          }}
        />
      ))}
    </div>
  );
}; 

export default Background;
