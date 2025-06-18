import React from 'react';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import SkillCard from '../SkillCard/SkillCard';
import './BackendSkills.css';
import './BackendSkillsMorning.css';
import './BackendSkillsDay.css';
import './BackendSkillsSunset.css';
import './BackendSkillsNight.css';


const BackendSkills = ({time}) => {
  const { timeOfDay } = useTimeOfDay(time);
  
  return (
    <div>
      <h1 className="backend-title">Backend Skills</h1>
      <h2 className="backend-subtitle">Fullstack Developer | Spring Ecosystem & React.js</h2>
      
    <div className={`${timeOfDay}-backend-skills`}>
      {/* <p className="skill-about">Как Fullstack-разработчик с глубокой экспертизой в Java и экосистеме Spring, я специализируюсь на создании надежных, масштабируемых и безопасных backend-решений.</p> */}

      <div className={`${timeOfDay}-skill-section`}>
          <h3>Основные технологии</h3>
          
          <div className="skills-grid">
              <SkillCard time={time}
                  title="Java Core" 
                  level={4} 
                  description="Многопоточность, коллекции, Stream API"
                  details="Обладаю глубоким пониманием основных концепций Java, включая многопоточность для высокопроизводительных приложений, эффективную работу с коллекциями и Stream API для обработки данных."
              />
              <SkillCard time={time}
                  title="Spring Framework" 
                  level={4}
                  description="Spring Boot, Spring MVC, Spring Security"
                  details="Экспертное владение Spring Framework, включая Spring Boot для быстрого развертывания, Spring MVC для создания RESTful API и Spring Security для обеспечения безопасности приложений."
              />
          </div>
      </div>

      <div className={`${timeOfDay}-skill-section`}>
        <h3>Базы данных</h3>
        <div className="skills-grid">
          <SkillCard time={time}
            title="Hibernate/JPA" 
            level={3} 
            description="ORM, Entity mapping, HQL"
            details="Опыт работы с Hibernate и JPA для эффективного взаимодействия с базами данных, включая ORM, маппинг сущностей и написание HQL/JPQL запросов."
          />
          <SkillCard time={time}
            title="PostgreSQL" 
            level={3}
            description="Написание запросов, оптимизация"
            details="Уверенное владение PostgreSQL, включая написание сложных SQL-запросов, оптимизацию производительности и проектирование схем баз данных."
          />
        </div>
      </div>

      <div className={`${timeOfDay}-skill-section`}>
        <h3>Инструменты</h3>
        <div className="skills-grid">
          <SkillCard time={time}
            title="Maven/Gradle" 
            level={4} 
            description="Сборка проектов, управление зависимостями"
            details="Профессиональное использование Maven и Gradle для автоматизации сборки проектов, управления зависимостями и конфигурацией."
          />
          <SkillCard time={time}
            title="Git"   
            level={3}
            description="Ветвление, merge, работа с репозиториями"
            details="Продвинутое владение системой контроля версий Git, включая эффективное ветвление, слияние (merge) и работу с удаленными репозиториями."
          />
        </div>
      </div>
  </div>
</div>
  );
};


export default BackendSkills;