# CI/CD Setup Guide

This document explains how to set up Continuous Integration and Continuous Deployment for the AI Interactive Book Platform.

## GitHub Actions Workflows

We have three main GitHub Actions workflows:

1. **Frontend CI/CD** (`frontend-ci.yml`) - Tests and deploys the Docusaurus frontend
2. **Backend CI/CD** (`backend-ci.yml`) - Tests the FastAPI backend
3. **Full Project CI** (`ci.yml`) - Runs quality checks on the entire project

## Setting Up Secrets

To enable automatic deployment, you need to set up the following secrets in your GitHub repository:

1. Go to your repository settings
2. Click on "Secrets and variables" → "Actions"
3. Add the following secrets:

### For Frontend Deployment (Vercel)
- `VERCEL_TOKEN` - Your Vercel token for authentication
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### For Backend Services
- `OPENAI_API_KEY` - Your OpenAI API key
- `QDRANT_API_KEY` - Your Qdrant API key (if using Qdrant Cloud)

## Workflow Triggers

- Workflows run automatically on pushes and pull requests to the `main` branch
- Frontend workflow only runs when files in `frontend/book-website/` are changed
- Backend workflow only runs when files in `backend/api/` are changed
- Full project workflow runs on all pushes and pull requests to `main`

## Manual Deployment

If you prefer to deploy manually, you can trigger workflows from the GitHub Actions tab in your repository.

## Monitoring Deployments

All workflow runs can be monitored in the GitHub Actions tab, where you can see logs and status for each step.