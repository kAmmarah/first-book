# Public Deployment Guide

This guide will help you deploy your AI Interactive Book Platform to get a working public URL.

## Current Deployment Status

Your project is already connected to GitHub and has a Vercel deployment, but it appears to have errors:
- Current (broken) URL: https://first-book-45t7-7v7lzt1qx-ammaras-projects-85ee12e7.vercel.app/

## Redeploying to Vercel

### Option 1: Redeploy through Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Find your "FIRST-BOOK" project or import it if it doesn't exist
3. Connect it to your GitHub repository: https://github.com/kAmmarah/FIRST-BOOK
4. Configure the project settings:
   - Framework Preset: Docusaurus
   - Root Directory: `frontend/book-website`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. Add environment variables in the Vercel dashboard:
   - No specific environment variables are needed for the frontend at this time

6. Deploy the project

### Option 2: Use Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project:
   ```bash
   cd /Users/ammarah/first-book/frontend/book-website
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## Backend Deployment Options

For the backend API, you have several options:

### Option 1: Render (Recommended for simplicity)
1. Go to https://render.com/
2. Create a new Web Service
3. Connect to your GitHub repository
4. Configure settings:
   - Root directory: `backend/api`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment variables:
     - DATABASE_URL: Your Neon Postgres connection string
     - SECRET_KEY: A secure secret key
     - OPENAI_API_KEY: Your OpenAI API key
     - QDRANT_URL: Your Qdrant Cloud URL
     - QDRANT_API_KEY: Your Qdrant API key
     - FRONTEND_URL: Your frontend URL (once you have it)

### Option 2: Railway
1. Go to https://railway.app/
2. Create a new project
3. Connect to your GitHub repository
4. Configure the service to run the backend with the same settings as above

## Updating Frontend API Configuration

Once you have your backend deployed, you'll need to update your frontend to point to the new backend URL:

1. In your Vercel project settings, add an environment variable:
   - Key: `REACT_APP_API_BASE_URL`
   - Value: Your deployed backend URL (e.g., https://your-backend.onrender.com)

2. Redeploy the frontend

## Troubleshooting Common Issues

### 404 Errors
If you encounter 404 errors after deployment:

1. Check that the `baseUrl` in `docusaurus.config.js` is set to `/`
2. Verify the `vercel.json` routes configuration is correct

### Environment Variables Not Loading
If environment variables aren't loading:

1. Ensure they're properly prefixed (REACT_APP_ for frontend)
2. Check that they're set in the Vercel dashboard
3. Redeploy after making changes

### Build Failures
If builds are failing:

1. Check the build logs in Vercel
2. Ensure all dependencies are correctly listed in package.json
3. Verify Node.js version compatibility (18+)

## Getting Your Final URLs

After successful deployment:

- Frontend URL: Will be provided by Vercel (something like https://first-book-xyz123.vercel.app/)
- Backend URL: Will be provided by your chosen backend hosting platform

Update your project documentation with these URLs once you have them.