// API service for communicating with the backend

// Handle both browser and Node.js environments
const API_BASE_URL = typeof process !== 'undefined' && process.env 
  ? (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000')
  : 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Authentication APIs
  async signup(userData) {
    const response = await fetch(`${this.baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Signup failed: ${response.statusText}`);
    }

    return response.json();
  }

  async signin(credentials) {
    const response = await fetch(`${this.baseUrl}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Signin failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile(token) {
    const response = await fetch(`${this.baseUrl}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    return response.json();
  }

  // Personalization API
  async personalizeContent(content, token) {
    const response = await fetch(`${this.baseUrl}/api/personalize/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Personalization failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Translation API
  async translateContent(text, targetLanguage = 'ur', token) {
    const response = await fetch(`${this.baseUrl}/api/translate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text, target_language: targetLanguage }),
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Chat API
  async chatWithBot(query, context = null, token) {
    const requestBody = { query };
    if (context) {
      requestBody.context = context;
    }

    const response = await fetch(`${this.baseUrl}/api/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Chat failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export default new ApiService();