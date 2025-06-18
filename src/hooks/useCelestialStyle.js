// hooks/useCelestialStyle.js
import { useEffect, useState } from 'react';

const useCelestialStyle = (time) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!time) return;

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const isDay = hours >= 6 && hours < 18;
    const isSunset = (hours >= 17 && hours < 19) || (hours >= 5 && hours < 7);

    let progress, yPos;
    if (isDay) {
      progress = ((hours - 6) * 60 + minutes) / 720;
      yPos = progress * 100;
    } else {
      progress = 1 - (((hours < 6 ? hours + 24 : hours) - 18) * 60 + minutes) / 720;
      yPos = progress * 100;
    }

    let newStyle = {
      left: '50vw',
      top: `${yPos}vh`,
      transform: 'translateX(-50%)',
      transition: 'all 0.5s ease-in-out'
    };

    if (isSunset) {
      const intensity = hours < 7 
        ? (hours - 5) + (minutes / 60)
        : 3 - (hours - 17) - (minutes / 60);

      newStyle = {
        ...newStyle,
        backgroundColor: `rgba(255, ${100 + Math.floor(155 * intensity / 3)}, ${Math.floor(100 * (1 - intensity / 3))}, 0.9)`,
        boxShadow: `0 0 40px rgba(255, ${100 + Math.floor(155 * intensity / 3)}, ${Math.floor(100 * (1 - intensity / 3))}, 0.8)`,
        width: '40vw',
        height: '40vw'
      };
    } else if (isDay) {
      newStyle = {
        ...newStyle,
        backgroundColor: 'rgba(255, 255, 100, 0.9)',
        boxShadow: '0 0 50px rgba(255, 255, 100, 0.9)',
        width: '50vw',
        height: '50vw'
      };
    } else {
      newStyle = {
        ...newStyle,
        backgroundColor: 'rgba(210, 210, 255, 0.9)',
        boxShadow: '0 0 30px rgba(210, 210, 255, 0.7)',
        width: '30vw',
        height: '30vw'
      };
    }

    setStyle(newStyle);
  }, [time]);

  return style;
};

export default useCelestialStyle;
