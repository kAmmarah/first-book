import React from 'react';

const PersonalizeButton = ({ onClick, loading }) => {
  return (
    <button 
      className="personalize-button"
      onClick={onClick}
      disabled={loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="personalizeBtnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <circle cx="12" cy="8" r="4" fill="url(#personalizeBtnGradient)" />
        <path d="M20,22 C20,17.58 16.42,14 12,14 C7.58,14 4,17.58 4,22" fill="none" stroke="url(#personalizeBtnGradient)" strokeWidth="2"/>
        <circle cx="18" cy="6" r="3" fill="none" stroke="url(#personalizeBtnGradient)" strokeWidth="1.5"/>
        <path d="M18,3 L18,9 M15,6 L21,6 M20.12,7.12 L21.54,5.71 M18.71,4.29 L20.12,5.71 M20.12,4.88 L18.71,6.29 M21.54,7.71 L20.12,6.29" 
              stroke="url(#personalizeBtnGradient)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
      {loading ? 'Personalizing...' : 'Personalize Chapter for Me'}
    </button>
  );
};

export default PersonalizeButton;