# AI Interactive Book Platform

An AI-powered interactive book platform with personalization, translation, and chatbot features.

## Features

- 📚 **Interactive Book Content**: Docusaurus-based website with MDX support
- 🔐 **User Authentication**: Better-Auth integration with profile collection
- 🤖 **AI Chatbot**: RAG-powered assistant with context-aware responses
- 🎯 **Personalization**: Content adaptation based on user profiles
- 🌍 **Translation**: One-click translation to Urdu and other languages
- 📊 **Analytics**: User engagement tracking and insights
- ☁️ **Cloud Infrastructure**: Neon Postgres, Qdrant Cloud, and more

## Tech Stack

### Frontend
- [Docusaurus](https://docusaurus.io/) - Static site generator
- React - UI framework
- MDX - Markdown with JSX components

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [Better-Auth](https://better-auth.com/) - Authentication library
- [PostgreSQL](https://www.postgresql.org/) - Neon Serverless Postgres
- [Qdrant](https://qdrant.tech/) - Vector database for RAG
- [OpenAI](https://openai.com/) - AI models for chat and personalization

### Infrastructure
- Docker - Containerization
- GitHub Actions - CI/CD
- Vercel - Static site hosting and serverless functions

## Project Structure

```
.
├── frontend/
│   └── book-website/           # Docusaurus website
├── backend/
│   └── api/                    # FastAPI backend
├── agents/
│   ├── skills/                 # Reusable AI skills
│   └── subagents/              # Claude Code subagents
├── docs/                       # Documentation
└── docker-compose.yml          # Development setup
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker (optional but recommended)

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kAmmarah/FIRST-BOOK.git
   cd FIRST-BOOK
   ```

2. **Start frontend**:
   ```bash
   cd frontend/book-website
   npm install
   npm start
   ```

3. **Start backend**:
   ```bash
   cd backend/api
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Or use Docker**:
   ```bash
   docker-compose up --build
   ```

### Environment Configuration

Create `.env` files in both frontend and backend directories based on the provided `.env.example` files:

**Backend** (`backend/api/.env`):
Refer to `backend/api/.env.example` for all required environment variables.

**Frontend** (`frontend/book-website/.env`):
Refer to `frontend/book-website/.env.example` for all required environment variables.

For production deployments, set the appropriate environment variables in your hosting platform (Vercel for frontend, your cloud provider for backend).

## Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Select the `frontend/book-website` directory as the root
3. Set the build command to `npm run build`
4. Set the output directory to `build`
5. Add environment variables as needed (refer to `frontend/book-website/.env.example`)

### Backend Deployment
The backend can be deployed to various cloud platforms that support Python applications:
- Vercel (with Serverless Functions)
- Render
- Railway
- Heroku
- AWS Lambda

Ensure you set all required environment variables from `backend/api/.env.example`.

## Documentation

Detailed documentation is available in the `docs/` directory:

- [Project Specification](docs/spec.md)
- [Architecture Plan](docs/plan.md)
- [Database Schema](docs/database_schema.md)
- [Qdrant Schema](docs/qdrant_schema.md)
- [Agent Skills](docs/agent_skills.md)
- [Frontend Components](docs/frontend_components.md)
- [Deployment Guide](docs/deployment.md)
- [Testing Procedures](docs/testing.md)
- [CI/CD Setup Guide](docs/ci-cd-setup.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on GitHub.

## Creator

This project was created by [Ammara Dawood](https://github.com/kAmmarah).
