import React  from 'react';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import './FooterMorning.css'
import './FooterDay.css';
import './FooterSunset.css';
import './FooterNight.css';
import './Footer.css';

const Footer = ({time}) => {

  const { timeOfDay } = useTimeOfDay(time);

  return (
    <footer className={`${timeOfDay}-app-footer`}>
      <div className="footer-content">
        <p>© 2025 Важенин Александр. Все права защищены.</p>
        <p>
          Свяжитесь со мной: <a href="mailto:vazheninsaha@gmail.com">vazheninsaha@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;