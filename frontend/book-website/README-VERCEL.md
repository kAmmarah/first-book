# Vercel Deployment Guide

This guide explains how to deploy the AI Interactive Book Platform to Vercel.

## Quick Deploy

1. Push your code to GitHub
2. Connect Vercel to your repository
3. Select the `/frontend/book-website` directory
4. Add environment variables as needed

## Environment Variables

For production deployment, set these environment variables in Vercel:

```
REACT_APP_API_BASE_URL=https://your-backend-url.vercel.app
ENABLE_MOCK_DATA=false
```

## Serverless API Routes

This project includes Vercel serverless functions in the `/api` directory:

- `/api/chat` - Handles chat requests
- `/api/health` - Health check endpoint

## Build Process

Vercel will automatically:

1. Install dependencies with `npm install`
2. Build the static site with `npm run build`
3. Deploy the `build` directory

## Custom Domains

Configure custom domains through the Vercel dashboard.

## Troubleshooting

If you encounter issues:

1. Check the deployment logs in Vercel
2. Verify all environment variables are set correctly
3. Ensure the backend API is accessible from the frontend

For support, contact: https://twitter.com/AmmaraDawood