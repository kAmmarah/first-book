import React from 'react';
import ChatWidget from './ChatWidget';

const AppWrapper = ({ children }) => {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
};

export default AppWrapper;