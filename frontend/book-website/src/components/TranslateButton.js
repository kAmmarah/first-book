import React from 'react';

const TranslateButton = ({ onClick, loading }) => {
  return (
    <button 
      className="translate-button"
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
          <linearGradient id="translateBtnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="8" fill="none" stroke="url(#translateBtnGradient)" strokeWidth="1.5"/>
        <path d="M4,12 H20 M12,4 C14,6 18,8 18,12 C18,16 14,18 12,20 M12,4 C10,6 6,8 6,12 C6,16 10,18 12,20" 
              fill="none" stroke="url(#translateBtnGradient)" strokeWidth="1.5"/>
        <text x="12" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8" fill="url(#translateBtnGradient)">AB</text>
      </svg>
      {loading ? 'Translating...' : 'Translate to Urdu'}
    </button>
  );
};

export default TranslateButton;