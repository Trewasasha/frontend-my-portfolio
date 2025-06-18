import React, { useState, useEffect, useRef } from 'react';
import Background from './components/Background/Background';
import MovingElement from './components/MovingElement/MovingElement';
import TopMenu from './components/TopMenu/TopMenu';
import BackendSkills from './components/BackendSkills/BackendSkills';
import FrontendSkills from './components/FrontendSkills/FrontendSkills';
import Footer from './components/Footer/Footer';
import Contacts from './components/Contacts/Contacts';
import About from './components/About/About';
import Range from './components/Range/Range';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [time, setTime] = useState(new Date());
  const [isManual, setIsManual] = useState(false);
  const timerRef = useRef(null);

   // Автоматическое обновление времени каждую минуту (если не ручной режим)
   useEffect(() => {
    if (!isManual) {
      timerRef.current = setInterval(() => {
        setTime(new Date());
      }, 60000); 
    }

    return () => clearInterval(timerRef.current); 
  }, [isManual]);

  // Обработка изменения времени вручную
  const handleTimeChange = (newTime) => {
    if (!isManual) {
      setIsManual(true); 
      clearInterval(timerRef.current);
    }
    setTime(newTime);
  };

  return (
    <div className="app">
      <Background  time={time}/>
      <MovingElement time={time} />{}
      
      <TopMenu time={time} activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="content-container">
        <div className="celestial-spacer"></div> 
        
        <div className="main-content">


          {activeSection === 'home' && (
            <>
            <h1 className="main-title">Важенин Александр</h1>
            <h2 className="subtitle">Fullstack Developer | Spring Ecosystem & React.js</h2>

            <About time={time} /> 
            </>
          )}
          {activeSection === 'backend' && <BackendSkills time={time} />}
          {activeSection === 'frontend' && <FrontendSkills time={time} />}
          {activeSection === 'contacts' && <Contacts time={time} />}
        </div>
        
      </div>
          
      <div className='footer-range-container'>
          <Footer time={time} />
          <Range onTimeChange={handleTimeChange} />
        
      </div>
    </div>
  );
}

export default App;