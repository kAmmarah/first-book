# Vercel Deployment Instructions for AI Interactive Book Platform

## Overview

This document provides step-by-step instructions for deploying both the frontend and backend of the AI Interactive Book Platform on Vercel.

## Prerequisites

1. Vercel account (https://vercel.com)
2. GitHub account with repository access
3. OpenAI API key
4. Qdrant Cloud account (optional)
5. PostgreSQL database (Neon.tech recommended)

## Frontend Deployment (Docusaurus Website)

### 1. Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository (`kAmmarah/first-book`)
4. Select the root directory as `/frontend/book-website`
5. Configure the project:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### 2. Environment Variables

Add these environment variables in Vercel project settings:

```
REACT_APP_API_BASE_URL=https://your-backend-url.vercel.app
ENABLE_MOCK_DATA=false
```

### 3. Automated Deployment Script

You can use the provided deployment script to prepare your project for Vercel:

```bash
./deploy-vercel.sh
```

This script will:
- Verify project structure
- Install dependencies
- Run tests
- Build the project
- Provide deployment instructions

## Backend Deployment (FastAPI Server)

Since Vercel primarily supports static sites and serverless functions, you have two options:

### Option 1: Deploy Backend to Render.com (Recommended)

1. Go to https://render.com/
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the root directory to `/backend`
5. Set the build command to:
   ```
   pip install --no-cache-dir --upgrade -r api/requirements.txt
   ```
6. Set the start command to:
   ```
   uvicorn api.main:app --host 0.0.0.0 --port $PORT
   ```
7. Add environment variables:
   ```
   DATABASE_URL=your-postgresql-connection-string
   SECRET_KEY=your-generated-secret-key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   OPENAI_API_KEY=your-openai-api-key
   QDRANT_URL=your-qdrant-cloud-url
   QDRANT_API_KEY=your-qdrant-api-key
   BETTER_AUTH_SECRET=your-better-auth-secret
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ENVIRONMENT=production
   ```

### Option 2: Deploy Backend as Serverless Functions on Vercel

1. Restructure the backend to use Vercel's serverless functions
2. Create API routes in the `/api` directory
3. Convert FastAPI endpoints to Vercel-compatible functions

## Environment Variable Setup

### Frontend (.env.local in Vercel)
```
REACT_APP_API_BASE_URL=https://your-backend-service.onrender.com
```

### Backend Environment Variables (Render.com or Vercel)
```
DATABASE_URL=your-postgresql-database-url
SECRET_KEY=generate-a-secure-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=your-openai-api-key-from-platform.openai.com
QDRANT_URL=your-qdrant-cloud-url
QDRANT_API_KEY=your-qdrant-api-key
BETTER_AUTH_SECRET=generate-another-secure-secret
FRONTEND_URL=https://your-vercel-frontend.vercel.app
ENVIRONMENT=production
```

## Custom Domain Setup

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## CI/CD Pipeline

The project already includes GitHub Actions workflows in `.github/workflows/`:
- Frontend tests: `.github/workflows/test_frontend.yml`
- Backend tests: `.github/workflows/test_backend.yml`
- Vercel deployment test: `.github/workflows/vercel-test.yml`

These will automatically run on pull requests and deploys.

## Monitoring and Analytics

### Frontend
- Vercel provides built-in analytics
- Add Google Analytics by setting `NEXT_PUBLIC_ANALYTICS_ID` in environment variables

### Backend
- Use Render.com's built-in monitoring
- Implement custom logging in your application

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly set in backend environment variables
2. **API Connection Failures**: Verify `REACT_APP_API_BASE_URL` points to the correct backend URL
3. **Build Failures**: Check that all dependencies are correctly specified in requirements.txt and package.json

### Debugging Steps

1. Check Vercel deployment logs
2. Verify environment variables are correctly set
3. Test API endpoints directly
4. Check browser console for frontend errors

## Creator Attribution

This project was created by Ammara Dawood as part of the Physical AI & Humanoid Robotics Course.

For support, contact: https://twitter.com/AmmaraDawood