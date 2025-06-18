import React from 'react';
import './MovingElement.css';
import useCelestialStyle from '../../hooks/useCelestialStyle';

const MovingElement = ({ time }) => {
  const style = useCelestialStyle(time);

  return <div className="celestial-body" style={style} />;
};

export default MovingElement;
