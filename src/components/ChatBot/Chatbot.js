import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Chatbot.css';

const Chatbot = ({ apiUrl = 'http://localhost:8080/api/chat' }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Быстрые команды
  const quickReplies = [
    { text: 'Какие услуги?', payload: 'Какие backend услуги вы предоставляете?' },
    { text: 'Цены', payload: 'Цены' },
    { text: 'Spring Boot', payload: 'Вы работаете с Spring Boot?' },
    { text: 'Связаться', payload: 'Связаться с владельцем сайта' }
  ];

  // Восстановление sessionId из localStorage при загрузке
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatbotSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

  // Автопрокрутка к новым сообщениям
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleQuickReply = (text) => {
    setInputValue(text);
    // Автоматически отправляем сообщение при выборе быстрого ответа
    setTimeout(() => {
      handleSendMessage(text);
    }, 100);
  };

  const handleSendMessage = async (customMessage) => {
    const messageText = customMessage || inputValue.trim();
    if (!messageText || isLoading) return;

    // Добавляем сообщение пользователя в чат
    const newMessage = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    if (!customMessage) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Session-Id': sessionId || ''
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Сохраняем sessionId из ответа сервера
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem('chatbotSessionId', data.sessionId);
      }

      // Добавляем ответ бота в чат
      const botMessage = { text: data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Ошибка:', error);
      const errorMessage = { 
        text: error.message.includes('HTTP error') 
          ? 'Ошибка сервера. Попробуйте позже.' 
          : 'Не удалось подключиться к серверу',
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Блок быстрых кнопок - теперь всегда видимый */}
      <div className="quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => handleQuickReply(reply.payload)}
            disabled={isLoading}
          >
            {reply.text}
          </button>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Введите ваш вопрос"
          disabled={isLoading}
        />
        <button 
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? '...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
};

Chatbot.propTypes = {
  apiUrl: PropTypes.string
};

export default Chatbot;