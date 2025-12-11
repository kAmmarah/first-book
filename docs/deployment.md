# Deployment Instructions

This document provides detailed instructions for deploying the AI Interactive Book platform both locally for development and to production environments.

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Production Deployment](#production-deployment)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Environment Configuration](#environment-configuration)
5. [CI/CD Pipeline](#ci-cd-pipeline)

## Local Development Setup

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)
- Docker and Docker Compose (recommended)
- PostgreSQL client
- Git

### Frontend Setup (Docusaurus)

1. Navigate to the frontend directory:
   ```bash
   cd frontend/book-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the website at `http://localhost:3000`

### Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend/api
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (see [Environment Configuration](#environment-configuration))

5. Run database migrations:
   ```bash
   python database/migrations.py
   ```

6. Start the development server:
   ```bash
   uvicorn main:app --reload
   ```

7. Access the API at `http://localhost:8000`

### Docker Setup (Recommended for Development)

1. From the project root, start all services:
   ```bash
   docker-compose up --build
   ```

2. Access services:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - PostgreSQL: `localhost:5432`

3. To stop services:
   ```bash
   docker-compose down
   ```

## Production Deployment

### Backend Deployment

#### Option 1: Docker Deployment

1. Build the Docker image:
   ```bash
   cd backend
   docker build -t ai-book-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 8000:8000 \
     -e DATABASE_URL=your_database_url \
     -e SECRET_KEY=your_secret_key \
     -e OPENAI_API_KEY=your_openai_key \
     -e QDRANT_URL=your_qdrant_url \
     -e QDRANT_API_KEY=your_qdrant_key \
     ai-book-backend
   ```

#### Option 2: Direct Deployment

1. Set up a Python environment on your server:
   ```bash
   python -m venv prod-env
   source prod-env/bin/activate
   pip install -r requirements.txt
   ```

2. Configure environment variables

3. Run the application with a production WSGI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

### Frontend Deployment

#### Option 1: Static File Deployment

1. Build the static site:
   ```bash
   cd frontend/book-website
   npm run build
   ```

2. Deploy the `build` directory to your web server

#### Option 2: Docker Deployment

1. Build the Docker image:
   ```bash
   cd frontend/book-website
   docker build -t ai-book-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 ai-book-frontend
   ```

## GitHub Pages Deployment

### Initial Setup

1. Create a new repository on GitHub for your book

2. Update `docusaurus.config.js` in `frontend/book-website`:
   ```javascript
   const config = {
     url: 'https://kAmmarah.github.io',
     baseUrl: '/your-repo-name/',
     organizationName: 'kAmmarah',
     projectName: 'your-repo-name',
     // ... rest of config
   };
   ```

3. Install the GitHub Pages deployment dependency:
   ```bash
   npm install --save @docusaurus/module-type-aliases
   ```

### Manual Deployment

1. Build the site:
   ```bash
   cd frontend/book-website
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   GIT_USER=kAmmarah npm run deploy
   ```

### Automated Deployment with GitHub Actions

1. Create `.github/workflows/deploy.yml` in your repository:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       name: Deploy to GitHub Pages
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
             cache: npm
             cache-dependency-path: frontend/book-website/package-lock.json
         
         - name: Install dependencies
           run: |
             cd frontend/book-website
             npm ci
         
         - name: Build website
           run: |
             cd frontend/book-website
             npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/book-website/build
             user_name: github-actions[bot]
             user_email: 41898282+github-actions[bot]@users.noreply.github.com
   ```

2. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment workflow"
   git push origin main
   ```

3. Enable GitHub Pages in your repository settings:
   - Go to Repository Settings
   - Scroll to "Pages" section
   - Set Source to "GitHub Actions"

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in `backend/api`:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication Secrets
SECRET_KEY=your-very-secure-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Qdrant Configuration
QDRANT_URL=https://your-qdrant-cloud-url.qdrant.tech
QDRANT_API_KEY=your-qdrant-api-key

# Better Auth Configuration
BETTER_AUTH_SECRET=your-better-auth-secret

# Frontend URL (for CORS)
FRONTEND_URL=https://your-domain.com
```

### Frontend Environment Variables

Create a `.env` file in `frontend/book-website`:

```env
# API Base URL
REACT_APP_API_BASE_URL=https://your-api-domain.com
```

## CI/CD Pipeline

### GitHub Actions Workflow

The project includes a GitHub Actions workflow for automated testing and deployment:

1. **Continuous Integration**: Runs on every pull request
   - Code linting
   - Unit tests
   - Build validation

2. **Continuous Deployment**: Runs on pushes to main branch
   - Builds the application
   - Deploys to GitHub Pages

### Setting up Secrets

Configure the following secrets in your GitHub repository:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `OPENAI_API_KEY` (for AI features)
   - `QDRANT_API_KEY` (for vector database)

## Monitoring and Maintenance

### Health Checks

The backend API includes health check endpoints:
- `/health` - Basic health check
- `/docs` - API documentation (Swagger UI)

### Logging

Both frontend and backend applications should implement structured logging:
- Backend: Use Python's logging module
- Frontend: Use console.log or dedicated logging libraries

### Backup Strategy

1. **Database Backups**: Regular backups of PostgreSQL database
2. **Content Backups**: Version control for book content
3. **Configuration Backups**: Store environment configurations securely

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly configured in backend
2. **Database Connection**: Verify `DATABASE_URL` format and credentials
3. **API Key Errors**: Check that all API keys are valid and have proper permissions
4. **Build Failures**: Ensure all dependencies are correctly installed

### Debugging Steps

1. Check application logs
2. Verify environment variables
3. Test connectivity between services
4. Validate API keys and permissions

## Scaling Considerations

### Horizontal Scaling

- Backend: Use load balancer with multiple instances
- Database: Use connection pooling
- Frontend: Serve static files via CDN

### Performance Optimization

- Implement caching for frequently accessed data
- Use database indexing for common queries
- Optimize API response times
- Minimize bundle size for frontend

This deployment guide should help you successfully deploy the AI Interactive Book platform in any environment.