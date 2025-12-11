import React, { useState, useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import apiService from '../services/api';

const ChatWidgetContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // 'en' for English, 'ur' for Urdu
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 
        ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'ur' ? 'ur-PK' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  // Demo responses for the chat
  const getDemoResponse = (input, language) => {
    const responses = {
      en: {
        'hello': 'Hello! How can I help you with the Physical AI & Humanoid Robotics course?',
        'hi': 'Hi there! Welcome to the AI course. What would you like to learn today?',
        'chapter 1': 'Chapter 1 covers the fundamentals of Artificial Intelligence. It introduces key concepts like machine learning, neural networks, and the history of AI development.',
        'what is ai': 'Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect.',
        'default': 'Thanks for your message! This is a demo response. In a full implementation, this would connect to an AI backend to provide personalized learning assistance.'
      },
      ur: {
        'ہیلو': 'ہیلو! میں آپ کی فزیکل اے آئی اور ہیومینائڈ روبوٹکس کورس میں کس طرح مدد کر سکتا ہوں؟',
        'ہائی': 'ہائی! اے آئی کورس میں خوش آمدید۔ آج آپ کیا سیکھنا چاہیں گے؟',
        'باب 1': 'باب 1 مصنوعی ذہانت کے بنیادی اصولوں پر مشتمل ہے۔ یہ مشین لرننگ، نیورل نیٹ ورکس، اور اے آئی کی ترقی کی تاریخ جیسی کلیدی تصورات کا تعارف پیش کرتا ہے۔',
        'ای آئی کیا ہے': 'مصنوعی ذہانت (ای آئی) ایسے نظام یا مشینوں کو کہتے ہیں جو انسانی ذہانت کی نقل کرتے ہیں تاکہ کام انجام دے سکیں اور ان معلومات کی بنیاد پر خود کو بہتر بناتے رہیں جو وہ جمع کرتی ہیں۔',
        'ڈیفالٹ': 'آپ کے پیغام کا شکریہ! یہ ایک ڈیمو جواب ہے۔ مکمل نفاذ میں، یہ اے آئی بیک اینڈ سے منسلک ہو کر ذاتی نوعیت کی تعلیمی مدد فراہم کرے گا۔'
      }
    };

    const lowerInput = input.toLowerCase();
    const langResponses = responses[language] || responses.en;
    
    // Try to find a matching response
    for (const [key, response] of Object.entries(langResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Return default response
    return langResponses.default || langResponses['default'];
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = { 
      text: inputValue, 
      sender: 'user',
      language: selectedLanguage
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get demo response
      const responseText = getDemoResponse(inputValue, selectedLanguage);
      
      const botMessage = { 
        text: responseText, 
        sender: 'bot',
        language: selectedLanguage
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Speak the response
      speakText(responseText, selectedLanguage);
    } catch (error) {
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot',
        language: selectedLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage === 'ur' ? 'ur-PK' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      }
    }
  };

  const speakText = (text, language) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ur' ? 'ur-PK' : 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Set voice based on language
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        // Try to find a suitable voice
        let selectedVoice = null;
        for (const voice of voices) {
          if (language === 'ur' && (voice.lang.includes('ur') || voice.lang.includes('PK'))) {
            selectedVoice = voice;
            break;
          } else if (language === 'en' && voice.lang.includes('en')) {
            selectedVoice = voice;
            break;
          }
        }
        
        // If no specific voice found, use the first available one
        utterance.voice = selectedVoice || voices[0];
      }
      
      synthRef.current.speak(utterance);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === 'en' ? 'ur' : 'en';
    setSelectedLanguage(newLanguage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="chat-toggle-button"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: '#2e8555',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        Chat with AI
      </button>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>AI Assistant</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '2px 8px',
              marginRight: '10px',
              borderRadius: '4px'
            }}
          >
            {selectedLanguage === 'en' ? 'اردو' : 'English'}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`chat-message ${message.sender}`}
          >
            <span>{message.text}</span>
            {message.sender === 'bot' && (
              <button
                onClick={() => speakText(message.text, message.language)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2e8555',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginLeft: '10px'
                }}
              >
                🔊
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={selectedLanguage === 'en' ? "Ask me anything about the book..." : "کتاب کے بارے میں مجھ سے کچھ بھی پوچھیں..."}
          disabled={isLoading}
          style={{ direction: selectedLanguage === 'ur' ? 'rtl' : 'ltr' }}
        />
        <button 
          onClick={handleVoiceInput}
          disabled={isLoading}
          style={{
            background: isListening ? '#ff6b6b' : '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            cursor: 'pointer',
            marginLeft: '5px'
          }}
        >
          {isListening ? '⏹️' : '🎤'}
        </button>
        <button 
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const ChatWidget = () => {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <ChatWidgetContent />}
    </BrowserOnly>
  );
};

export default ChatWidget;