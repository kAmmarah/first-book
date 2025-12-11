export function onRouteDidUpdate({ location, previousLocation }) {
  // Add chat widget to the page
  if (typeof window !== 'undefined') {
    // Remove any existing chat widget containers
    const existingContainers = document.querySelectorAll('.chat-widget-container');
    existingContainers.forEach(container => container.remove());
    
    // Create a new container for the chat widget
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-widget-container';
    chatContainer.id = 'chat-widget-container';
    document.body.appendChild(chatContainer);
    
    // We'll render the ChatWidget component using React in a separate script
    // This is a placeholder that will be replaced by React
    chatContainer.innerHTML = '<!-- Chat Widget Container -->';
  }
}