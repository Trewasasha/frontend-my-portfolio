import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Chatbot.css';

const Chatbot = ({ apiUrl = 'http://185.135.80.107:8080/api/chat' }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const messagesEndRef = useRef(null);

  // Быстрые команды
  const quickReplies = [
    { text: 'Какие услуги?', payload: 'Какие backend услуги вы предоставляете?' },
    { text: 'Цены', payload: 'Цены' },
    { text: 'Spring Boot', payload: 'Вы работаете с Spring Boot?' },
    { text: 'Связаться', payload: 'Связаться с владельцем сайта' }
  ];

  // Инициализация сессии
  const initializeSession = async () => {
    try {
      const response = await fetch('http://185.135.80.107:8080/api/session');
      const data = await response.json();
      setSessionId(data.sessionId);
      localStorage.setItem('chatbotSessionId', data.sessionId);
      return data.sessionId;
    } catch (error) {
      console.error('Ошибка создания сессии:', error);
      return null;
    }
  };

  // Восстановление sessionId из localStorage при загрузке
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatbotSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    } else {
      initializeSession();
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
    setInputValue('');
    handleSendMessage(text);
  };

  const handleSendMessage = async (customMessage) => {
    const messageText = (customMessage || inputValue).trim();
    if (!messageText || isLoading) return;

    // Добавляем сообщение пользователя в чат
    const userMessage = {
      text: messageText,
      sender: 'user',
      lines: messageText.split('\n')
    };
    setMessages(prev => [...prev, userMessage]);
    if (!customMessage) setInputValue('');
    setIsLoading(true);
    setConnectionError(false);

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
      const botMessage = { 
        text: data.response, 
        sender: 'bot',
        lines: data.response.split('\n')
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Ошибка:', error);
      setConnectionError(true);
      const errorMessage = { 
        text: error.message.includes('HTTP error') 
          ? 'Ошибка сервера. Попробуйте позже.' 
          : 'Не удалось подключиться к серверу',
        sender: 'bot',
        lines: []
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
            {msg.lines ? (
              msg.lines.map((line, i) => <p key={i}>{line}</p>)
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {connectionError && (
        <div className="connection-error">
          Проблемы с подключением. Попробуйте позже.
        </div>
      )}
      
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