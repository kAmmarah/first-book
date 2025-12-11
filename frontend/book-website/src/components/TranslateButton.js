import React from 'react';

const TranslateButton = ({ onClick, loading }) => {
  return (
    <button 
      className="translate-button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Translating...' : 'Translate to Urdu'}
    </button>
  );
};

export default TranslateButton;