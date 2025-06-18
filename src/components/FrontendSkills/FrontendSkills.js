import React from "react";
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import SkillCard from '../SkillCard/SkillCard';
import './FrontendSkills.css';
import './FrontendSkillsMorning.css';
import './FrontendSkillsDay.css';
import './FrontendSkillsSunset.css';
import './FrontendSkillsNight.css';

const FrontendSkills = ({time}) => {
    const { timeOfDay } = useTimeOfDay(time);

    return (
        <div>
            <h1 className="frontend-title">Frontend Skills</h1>
            <h2 className="frontend-subtitle">Fullstack Developer | Spring Ecosystem & React.js</h2>
            
            <div className={`${timeOfDay}-front-skills`}>
                <div className={`${timeOfDay}-skill-section`}>
                    <h3>Основные технологии</h3>
                    <div className="skills-grid">
                       <SkillCard time={time}
                          title="React" 
                          level={4} 
                           description="Hooks, Context API, Redux"
                       />
                       <SkillCard time={time}
                          title="JavaScript" 
                          level={4}
                          description="ES6+, Async/Await, DOM API"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontendSkills;