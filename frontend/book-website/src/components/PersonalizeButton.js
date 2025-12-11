import React from 'react';

const PersonalizeButton = ({ onClick, loading }) => {
  return (
    <button 
      className="personalize-button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Personalizing...' : 'Personalize Chapter for Me'}
    </button>
  );
};

export default PersonalizeButton;