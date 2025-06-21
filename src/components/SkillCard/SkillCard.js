import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import './SkillCard.css';

const SkillCard = ({ time, title, level, description, details }) => {
    const { timeOfDay } = useTimeOfDay(time);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        handleResize(); // Проверяем при монтировании
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div 
            className={`${timeOfDay}-skill-card ${isHovered && !isMobile ? 'hovered' : ''}`}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onClick={() => isMobile && setIsHovered(!isHovered)}
        >
            <div className="skill-card-content">
                <h4>{title}</h4>
                <div className={`${timeOfDay}-skill-level`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < level ? 'filled' : ''}>★</span>
                    ))}
                </div>
                <p className="skill-description">{description}</p>
                
                {(isHovered || isMobile) && (
                    <div className="skill-details">
                        <p>{details || 'Дополнительная информация о навыке...'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

SkillCard.propTypes = {
    time: PropTypes.string,
    title: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string
};

export default SkillCard;