// Simple script to ensure the chat widget button is visible
// This is a fallback in case the React component doesn't load

(function() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatWidget);
  } else {
    initializeChatWidget();
  }
  
  function initializeChatWidget() {
    // Check if chat widget already exists
    if (document.querySelector('.chat-toggle-button') || document.querySelector('.chat-container')) {
      return;
    }
    
    // Create a simple chat toggle button as fallback
    const chatToggle = document.createElement('button');
    chatToggle.textContent = 'Chat with AI';
    chatToggle.className = 'chat-toggle-button';
    chatToggle.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      background-color: #2e8555;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    
    chatToggle.onclick = function() {
      alert('AI Chat with voice support in English and Urdu is available! This is a demo of the full functionality.');
    };
    
    document.body.appendChild(chatToggle);
  }
})();