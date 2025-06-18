import React from 'react';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import myImage from './my.jpg';
import './AboutMorning.css';
import './AboutDay.css';
import './AboutSunset.css';
import './AboutNight.css';
import './About.css';

const About = ({time}) => {

    const { timeOfDay } = useTimeOfDay(time);

    return (
        <div className={`${timeOfDay}-about-background`}>
            <div className="about-content-wrapper">
                <div className="about-text-btn">            
                    <div className="about-text">
                        <p>Привет, я Важенин Александр — Fullstack-разработчик с экспертизой в Java и Spring. Создаю надежную backend-архитектуру, проектирую API, интегрирую базы данных и обеспечиваю стабильную работу сервисов.</p>
                        
                        {/* <p>Разработка для меня — это не просто рутинное написание кода, а захватывающий процесс поиска нестандартных решений для сложных задач. Мне нравится погружаться в проблему, анализировать её с разных сторон и находить элегантные и эффективные подходы, которые выходят за рамки стандартных шаблонов. Именно в поиске этих нетривиальных путей и заключается для меня истинное удовольствие от работы fullstack разработчика, будь то оптимизация backend-логики на Java Spring или создание интуитивно понятного и функционального frontend на React.js.</p> */}
                    </div>

                    <div className="about-buttons">
                        <a href="/resume.pdf" download className="about-button">
                            📄 Скачать резюме
                        </a>
                        <a href="#contact" className="about-button">
                            📬 Связаться со мной
                        </a>
                        <a href="https://github.com/Trewasasha" className="about-button">
                            👨‍💻 Посмотреть проекты
                        </a>    
                    </div>  
                </div>

                <div className="about-image">
                    <img src={myImage} alt="Александр Важенин - Fullstack разработчик" />
                </div>
            </div>

            <div className="capabilities">
                <h2>Что я могу сделать для вас</h2>
                <ul>
                    <li>Разработка и поддержка масштабируемых backend-приложений на Java (Spring/Spring Boot).</li>
                    <li>Проектирование и разработка RESTful API для взаимодействия между различными сервисами.</li>
                    <li>Интеграция с реляционными базами данных (PostgreSQL, MySQL) и оптимизация запросов.</li>
                    <li>Создание современных и удобных пользовательских интерфейсов на React.js.</li>
                    <li>Обеспечение безопасности приложений с использованием Spring Security.</li>
                    <li>Контейнеризация приложений с помощью Docker для упрощения развертывания и масштабирования.</li>
                    <li>Участие в проектировании архитектуры и выборе технологического стека.</li>
                </ul>
            </div>
        </div>
    );
};

export default About;