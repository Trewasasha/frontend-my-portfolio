import React from 'react';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import './Contacts.css';
import './ContactsMorning.css';
import './ContactsDay.css';
import './ContactsSunset.css';
import './ContactsNight.css';
import Chatbot from '../ChatBot/Chatbot';

const Contacts = ({time}) => {

    const { timeOfDay } = useTimeOfDay(time);

  return (
    <div className="contacts-container">
      <h1 className="contacts-title">Свяжитесь со мной</h1>
      <h2 className="contact-subtitle">Fullstack Developer | Spring Ecosystem & React.js</h2>
      
      <div className={`${timeOfDay}-front-skills`}>
        <Chatbot />
      </div>
    
      

    </div>
  );
};

export default Contacts;