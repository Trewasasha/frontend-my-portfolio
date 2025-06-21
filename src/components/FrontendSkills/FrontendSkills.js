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
                {/* Основные фронтенд технологии */}
                <div className={`${timeOfDay}-skill-section`}>
                    <h3>Основные технологии</h3>
                    <div className="skills-grid">
                        <SkillCard 
                            time={time}
                            title="React" 
                            level={4} 
                            description="Hooks, Context API, Redux, Router"
                            details="Разработка SPA приложений с использованием функциональных компонентов и хуков. Опыт работы с React Router для навигации, Redux Toolkit для управления состоянием, оптимизация производительности с помощью useMemo/useCallback. Знание SSR (Next.js)."
                        />
                        <SkillCard 
                            time={time}
                            title="JavaScript" 
                            level={4}
                            description="ES6+, Async/Await, DOM API"
                            details="Глубокое понимание асинхронного программирования (Promises, async/await). Работа с DOM, событиями, замыканиями, прототипами. Использование современных возможностей ES6+: деструктуризация, шаблонные строки, модули. Опыт оптимизации производительности JS-кода."
                        />
                        <SkillCard 
                            time={time}
                            title="TypeScript" 
                            level={3}
                            description="Interfaces, Generics, Type Inference"
                            details="Типизация компонентов React (React.FC), работа с дженериками, utility-типами. Конфигурация tsconfig.json. Интеграция TS в существующие JS-проекты. Опыт работы с TypeScript в Node.js-приложениях."
                        />
                        <SkillCard 
                            time={time}
                            title="HTML/CSS" 
                            level={5}
                            description="Semantic HTML, CSS3, Flexbox/Grid"
                            details="Создание адаптивных, кросс-браузерных интерфейсов с использованием семантической верстки. Глубокая работа с CSS: кастомные свойства (variables), анимации, трансформации. Опыт с CSS-методологиями (BEM). Знание принципов доступности (a11y)."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontendSkills;