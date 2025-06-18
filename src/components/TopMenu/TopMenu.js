import React, { useState, useEffect } from 'react';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import './TopMenu.css';

const TopMenu = ({ time, activeSection, setActiveSection }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [leftScrolled, setLeftScrolled] = useState(false);
  const [rightScrolled, setRightScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      

      setLeftScrolled(scrollY > 50);
      

      setRightScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {


    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

  }, []);

  // Для мобильных устройств сокращаем названия пунктов меню
  const menuItems = [
    { id: 'home', title: isMobile ? 'Главная' : 'Главная' },
    { id: 'backend', title: isMobile ? 'Back' : 'Backend' },
    { id: 'frontend', title: isMobile ? 'Front' : 'Frontend' },
    { id: 'contacts', title: isMobile ? 'Контакты' : 'Контакты' }
  ];


  const { timeOfDay } = useTimeOfDay(time);


  return (
    <nav className={`${timeOfDay}-background`}>
      <ul className="menu-list">
        {/* Левая часть с отдельным классом для скролла */}
        <div className={`menu-left ${leftScrolled ? 'left-scrolled' : ''}`}>
          {menuItems.slice(0, 2).map((item) => (
            <li 
              key={item.id}
              className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className={`${timeOfDay}-menu-title`}>{item.title}</span>
            </li>
          ))}
        </div>

        {/* Правая часть с отдельным классом для скролла */}
        <div className={`menu-right ${rightScrolled ? 'right-scrolled' : ''}`}>
          {menuItems.slice(2, 4).map((item) => (
            <li 
              key={item.id}
              className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className={`${timeOfDay}-menu-title`}>{item.title}</span>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default TopMenu;