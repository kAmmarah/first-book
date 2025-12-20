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
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is currently playing
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null); // Reference to current utterance

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      // Load voices when they become available
      const loadVoices = () => {
        const voices = synthRef.current.getVoices();
        console.log('Available voices:', voices);
      };
      
      // Some browsers load voices asynchronously
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
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
      recognition.interimResults = true; // Allow interim results
      recognition.maxAlternatives = 1;
      recognition.lang = selectedLanguage === 'ur' ? 'ur-PK' : 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        // Update input with interim results for better UX
        setInputValue(finalTranscript || interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        alert(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      // Cleanup function - stop speech and recognition when component unmounts
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  // Effect to stop speech when chat is closed
  useEffect(() => {
    if (!isOpen) {
      // Stop any ongoing speech when chat is closed
      stopSpeech();
      // Stop any ongoing voice recognition
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, isListening]);

  // Get current chapter context
  const getCurrentChapterContext = () => {
    // Try to find the current chapter title
    const chapterTitleElement = document.querySelector('h1') || 
                             document.querySelector('h2') || 
                             document.querySelector('[class*="title"]') ||
                             document.querySelector('header h1');
    
    // Try to get the main content
    const contentElements = [
      document.querySelector('.markdown'),
      document.querySelector('[class*="docItemContainer"]'),
      document.querySelector('article'),
      document.querySelector('.main-wrapper'),
      document.querySelector('main')
    ];
    
    // Find the first available content element
    const contentElement = contentElements.find(el => el !== null);
    
    // Get breadcrumbs or navigation info
    const breadcrumbs = document.querySelector('[class*="breadcrumb"]') || 
                      document.querySelector('[class*="nav"]') ||
                      document.querySelector('nav');
    
    const chapterTitle = chapterTitleElement ? chapterTitleElement.textContent.trim() : 'Unknown Chapter';
    const breadcrumbText = breadcrumbs ? breadcrumbs.textContent.trim() : '';
    
    // Extract more comprehensive content
    let content = '';
    if (contentElement) {
      // Get text content but exclude navigation and other UI elements
      const clone = contentElement.cloneNode(true);
      
      // Remove common UI elements that shouldn't be part of the context
      const elementsToRemove = clone.querySelectorAll('nav, header, footer, .navbar, .sidebar, .toc, .table-of-contents');
      elementsToRemove.forEach(el => el.remove());
      
      content = clone.innerText.substring(0, 1500); // Increase context length
    }
    
    return {
      chapterTitle,
      breadcrumbText,
      content
    };
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
      // Get current chapter context
      const { chapterTitle, breadcrumbText, content } = getCurrentChapterContext();
      
      // Prepare comprehensive context for the AI
      const context = `Current Location: ${breadcrumbText}
Current Chapter: ${chapterTitle}

Relevant Content:
${content}`;
      
      // In a real app, you would get the token from context or state management
      // For now, we'll use the mock token
      const token = 'mock-auth-token';
      
      // Call the real backend API
      const response = await apiService.chatWithBot(inputValue, context, token);
      
      const responseText = response.response || 'I couldn\'t process that request. Please try again.';
      
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
      console.error('Chat error:', error);
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
      utteranceRef.current = utterance; // Store reference
      
      // Set language - enhanced support for Urdu
      if (language === 'ur') {
        // Try multiple Urdu language codes for better compatibility
        const urduLangCodes = ['ur-PK', 'ur-IN', 'ur'];
        let langSet = false;
        for (const langCode of urduLangCodes) {
          try {
            utterance.lang = langCode;
            langSet = true;
            break;
          } catch (e) {
            console.warn(`Could not set language to ${langCode}`);
          }
        }
        if (!langSet) {
          utterance.lang = 'ur-PK'; // fallback
        }
      } else {
        utterance.lang = 'en-US';
      }
      
      // Adjust speech parameters for better Urdu pronunciation
      utterance.rate = language === 'ur' ? 0.8 : 0.9; // Slightly slower for Urdu
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Set voice based on language
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        // Try to find a suitable voice
        let selectedVoice = null;
        
        // Sort voices by preference - enhanced for Urdu
        const preferredVoiceNames = language === 'ur' 
          ? ['Urdu', 'ur', 'PK', 'IN', 'female', 'Google', 'Microsoft'] 
          : ['Google', 'Microsoft', 'Samantha', 'Alex', 'female'];
        
        // First try to match by name
        for (const voice of voices) {
          const voiceName = voice.name.toLowerCase();
          if (language === 'ur' && (voice.lang.includes('ur') || voice.lang.includes('PK') || voice.lang.includes('IN'))) {
            // Prioritize female voices for Urdu as they tend to sound more natural
            if (voiceName.includes('female') || voiceName.includes('woman')) {
              selectedVoice = voice;
              break;
            } else if (preferredVoiceNames.some(name => voiceName.includes(name.toLowerCase()))) {
              selectedVoice = voice;
            }
          } else if (language === 'en' && voice.lang.includes('en')) {
            if (preferredVoiceNames.some(name => voiceName.includes(name.toLowerCase()))) {
              selectedVoice = voice;
              break;
            }
          }
        }
        
        // If no name match, try language match
        if (!selectedVoice) {
          for (const voice of voices) {
            if (language === 'ur' && (voice.lang.includes('ur') || voice.lang.includes('PK') || voice.lang.includes('IN'))) {
              selectedVoice = voice;
              break;
            } else if (language === 'en' && voice.lang.includes('en')) {
              selectedVoice = voice;
              break;
            }
          }
        }
        
        // If still no specific voice found, try to find any Urdu voice
        if (!selectedVoice && language === 'ur') {
          for (const voice of voices) {
            if (voice.lang.startsWith('ur')) {
              selectedVoice = voice;
              break;
            }
          }
        }
        
        // If no specific voice found, use the first available one
        utterance.voice = selectedVoice || voices[0];
      }
      
      // Add event listeners for better UX
      utterance.onstart = () => {
        console.log('Speech started with voice:', utterance.voice ? utterance.voice.name : 'default');
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log('Speech ended');
        setIsSpeaking(false);
        utteranceRef.current = null;
      };
      
      utterance.onerror = (event) => {
        console.error('Speech error', event);
        setIsSpeaking(false);
        utteranceRef.current = null;
      };
      
      synthRef.current.speak(utterance);
    }
  };

  // Stop current speech
  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      utteranceRef.current = null;
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

  const handleClose = () => {
    // Stop any ongoing speech when closing the chat
    stopSpeech();
    // Stop any ongoing voice recognition
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    setIsOpen(false);
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
          padding: '12px 18px',
          backgroundColor: '#2e8555',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontWeight: '500',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M21,12 C21,8.13 17.87,5 14,5 H6 C4.9,5 4,5.9 4,7 V17 C4,18.1 4.9,19 6,19 H7 L9,21 L11.5,19 H14 C17.87,19 21,15.87 21,12 Z" 
                fill="white"/>
          <circle cx="9" cy="11" r="1" fill="#2e8555"/>
          <circle cx="12" cy="11" r="1" fill="#2e8555"/>
          <circle cx="15" cy="11" r="1" fill="#2e8555"/>
        </svg>
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
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Close chat"
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
            <span className="message-text">{message.text}</span>
            <div className="message-actions">
              {message.sender === 'bot' && (
                <button
                  onClick={() => speakText(message.text, message.language)}
                  title="Listen to this message"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2e8555',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '2px',
                    marginRight: '5px'
                  }}
                >
                  🔊
                </button>
              )}
              {message.sender === 'bot' && isSpeaking && (
                <button
                  onClick={stopSpeech}
                  title="Stop speaking"
                  style={{
                    background: '#ff6b6b',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}
                >
                  ⏹️
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">
            <span className="message-text">Thinking...</span>
            <div className="message-actions">
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #f3f3f3',
                  borderTop: '2px solid #2e8555',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              />
            </div>
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
            marginLeft: '5px',
            minWidth: '40px'
          }}
          title={isListening ? 'Stop listening' : 'Start voice input'}
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