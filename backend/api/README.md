# AI Interactive Book Backend API

This is the backend API for the AI Interactive Book platform, built with FastAPI.

## Features

- User authentication (signup/signin) with Better-Auth
- Personalized content delivery based on user profiles
- RAG-powered chatbot for answering questions about book content
- Text translation service (including Urdu support)
- Vector database integration with Qdrant for semantic search
- PostgreSQL database for user data and chat logs

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL (Neon Serverless)
- **Vector DB**: Qdrant Cloud
- **Authentication**: Better-Auth + JWT
- **AI Services**: OpenAI API
- **Deployment**: Docker

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values:
   ```
   cp .env.example .env
   ```

3. Run the development server:
   ```
   uvicorn main:app --reload
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile

### Personalization
- `POST /api/personalize/` - Personalize chapter content

### Translation
- `POST /api/translate/` - Translate text to target language

### Chat
- `POST /api/chat/` - Chat with AI assistant

## Database Schema

The application uses SQLAlchemy ORM with the following models:

1. **User**: Stores user information and profiles
2. **ChatLog**: Logs chat interactions for analytics

## Deployment

The application can be deployed using Docker. See the Dockerfile for details.

For production deployment, make sure to:
- Set proper CORS origins
- Use strong secret keys
- Configure database connections securely
- Set up proper logging and monitoring