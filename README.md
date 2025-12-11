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
- GitHub Pages - Static site hosting

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
   git clone <repository-url>
   cd ai-interactive-book
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

Create `.env` files in both frontend and backend directories:

**Backend** (`backend/api/.env`):
```env
DATABASE_URL=
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
QDRANT_URL=your-qdrant-url
QDRANT_API_KEY=your-qdrant-api-key
```

**Frontend** (`frontend/book-website/.env`):
```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

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
