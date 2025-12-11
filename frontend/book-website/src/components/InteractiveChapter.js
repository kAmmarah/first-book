import React, { useState } from 'react';
import PersonalizeButton from './PersonalizeButton';
import TranslateButton from './TranslateButton';
import apiService from '../services/api';

const InteractiveChapter = ({ chapterTitle }) => {
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [loading, setLoading] = useState(false);

  // In a real app, you would get the token from context or state management
  const getAuthToken = () => {
    // This is a placeholder - in a real app, you would retrieve the actual token
    // For demo purposes, we'll return a mock token
    return 'mock-auth-token';
  };

  const handlePersonalize = async () => {
    if (isPersonalized) return;
    
    setLoading(true);
    try {
      // Get the content from the parent container
      // Try multiple selectors to find the content
      const contentElement = document.querySelector('.markdown') || 
                           document.querySelector('[class*="docItemContainer"]') ||
                           document.querySelector('article');
      
      if (!contentElement) {
        throw new Error('Could not find content to personalize');
      }
      
      const content = contentElement.innerText;
      
      // In a real app, you would use the actual auth token
      const token = getAuthToken();
      
      // For demo purposes, we'll simulate the API call
      // In a real implementation, you would uncomment the next lines:
      /*
      const response = await apiService.personalizeContent(content, token);
      
      // Update the content in the DOM
      if (response.personalized_content) {
        contentElement.innerHTML = response.personalized_content
          .split('\n')
          .map(paragraph => `<p>${paragraph}</p>`)
          .join('');
      }
      */
      
      // Demo implementation - just add a note that content was personalized
      const personalizedNote = document.createElement('div');
      personalizedNote.style.backgroundColor = '#e8f5e9';
      personalizedNote.style.padding = '10px';
      personalizedNote.style.margin = '10px 0';
      personalizedNote.style.borderRadius = '4px';
      personalizedNote.innerHTML = '<strong>✅ Content Personalized!</strong> In a real implementation, this would show content adapted to your learning profile.';
      contentElement.insertBefore(personalizedNote, contentElement.firstChild);
      
      setIsPersonalized(true);
      setLoading(false);
    } catch (error) {
      console.error('Personalization failed:', error);
      alert('Personalization failed: ' + error.message);
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (isTranslated) return;
    
    setLoading(true);
    try {
      // Get the content from the parent container
      // Try multiple selectors to find the content
      const contentElement = document.querySelector('.markdown') || 
                           document.querySelector('[class*="docItemContainer"]') ||
                           document.querySelector('article');
      
      if (!contentElement) {
        throw new Error('Could not find content to translate');
      }
      
      const content = contentElement.innerText;
      
      // In a real app, you would use the actual auth token
      const token = getAuthToken();
      
      // For demo purposes, we'll simulate the API call
      // In a real implementation, you would uncomment the next lines:
      /*
      const response = await apiService.translateContent(content, 'ur', token);
      
      // Update the content in the DOM
      if (response.translated_text) {
        contentElement.innerHTML = response.translated_text
          .split('\n')
          .map(paragraph => `<p>${paragraph}</p>`)
          .join('');
        contentElement.classList.add('urdu-content');
      }
      */
      
      // Demo implementation - just add a note that content was translated
      const translatedNote = document.createElement('div');
      translatedNote.style.backgroundColor = '#e3f2fd';
      translatedNote.style.padding = '10px';
      translatedNote.style.margin = '10px 0';
      translatedNote.style.borderRadius = '4px';
      translatedNote.innerHTML = '<strong>🌐 Content Translated to Urdu!</strong> In a real implementation, this would show the content translated to Urdu.';
      contentElement.insertBefore(translatedNote, contentElement.firstChild);
      
      setIsTranslated(true);
      setLoading(false);
    } catch (error) {
      console.error('Translation failed:', error);
      alert('Translation failed: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="interactive-chapter">
      <div className="chapter-controls">
        <PersonalizeButton 
          onClick={handlePersonalize} 
          loading={loading} 
        />
        <TranslateButton 
          onClick={handleTranslate} 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default InteractiveChapter;