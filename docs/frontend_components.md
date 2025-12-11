# Frontend Components Documentation

This document describes the React components implemented for the AI Interactive Book platform's frontend.

## Component Overview

The frontend implements several key components to provide interactive features:

1. **InteractiveChapter** - Main component that wraps chapter content with interactive features
2. **PersonalizeButton** - Button to trigger content personalization
3. **TranslateButton** - Button to trigger content translation
4. **ChatWidget** - Floating chat interface for AI assistance
5. **ApiService** - Service layer for backend API communication

## Component Details

### InteractiveChapter

The main wrapper component for book chapters that integrates all interactive features.

**Props**:
- `content` (string): The chapter content to display
- `chapterTitle` (string): The title of the chapter

**State**:
- `displayedContent` (string): The content currently displayed (may be personalized/translated)
- `isPersonalized` (boolean): Whether content has been personalized
- `isTranslated` (boolean): Whether content has been translated
- `loading` (boolean): Loading state for async operations

**Features**:
- Integrates PersonalizeButton and TranslateButton
- Manages content state and transformations
- Applies Urdu styling when content is translated

### PersonalizeButton

A button component that triggers content personalization based on user profile.

**Props**:
- `onClick` (function): Handler for button click
- `loading` (boolean): Loading state

**Behavior**:
- Displays "Personalize Chapter for Me" when idle
- Displays "Personalizing..." when active
- Disabled during loading

### TranslateButton

A button component that triggers content translation to Urdu.

**Props**:
- `onClick` (function): Handler for button click
- `loading` (boolean): Loading state

**Behavior**:
- Displays "Translate to Urdu" when idle
- Displays "Translating..." when active
- Disabled during loading

### ChatWidget

A floating chat interface that allows users to interact with the AI assistant.

**State**:
- `isOpen` (boolean): Whether the chat widget is open
- `messages` (array): Array of chat messages
- `inputValue` (string): Current value of the input field
- `isLoading` (boolean): Loading state for API requests

**Features**:
- Toggle visibility with floating button
- Message display with user/bot differentiation
- Auto-scroll to latest message
- Enter key support for sending messages
- Error handling for API failures

### ApiService

A service layer that handles communication with the backend API.

**Methods**:
- `signup(userData)`: Register a new user
- `signin(credentials)`: Authenticate a user
- `getProfile(token)`: Fetch user profile
- `personalizeContent(content, token)`: Personalize content
- `translateContent(text, targetLanguage, token)`: Translate content
- `chatWithBot(query, context, token)`: Chat with AI assistant

**Configuration**:
- Uses `REACT_APP_API_BASE_URL` environment variable or defaults to `http://localhost:8000`

## Integration with Docusaurus

Components are integrated into Docusaurus using MDX:

1. Import components at the top of MDX files
2. Use `<InteractiveChapter>` component to wrap chapter content
3. Components automatically handle API communication and state management

## Styling

Components use CSS classes defined in `src/css/custom.css`:

- `.personalize-button`: Styling for personalization button
- `.translate-button`: Styling for translation button
- `.chat-container`: Main chat widget container
- `.chat-header`: Chat widget header
- `.chat-messages`: Message display area
- `.chat-input`: Input area for chat
- `.chat-message`: Individual messages
- `.urdu-content`: Special styling for Urdu text (RTL, specific fonts)

## Authentication Integration

Components expect authentication tokens to be available. In the current implementation:

1. Tokens are retrieved via placeholder `getAuthToken()` function
2. In a real application, tokens would be managed via:
   - React Context
   - State management library (Redux, Zustand, etc.)
   - Browser localStorage/sessionStorage

## Error Handling

Components implement basic error handling:

1. Network errors are caught and logged
2. User-facing error messages are displayed
3. Loading states prevent duplicate requests
4. UI remains functional even when individual features fail

## Future Enhancements

Planned improvements:

1. **Improved State Management**: Use React Context or state management library
2. **Enhanced Error Handling**: More detailed error messages and recovery options
3. **Offline Support**: Cache content and queue requests
4. **Performance Optimization**: Lazy loading and memoization
5. **Accessibility**: Improved keyboard navigation and screen reader support
6. **Internationalization**: Support for multiple languages