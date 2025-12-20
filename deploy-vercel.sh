#!/bin/bash

# Script to help with Vercel deployment

echo "🚀 Preparing for Vercel Deployment"

# Check if we're in the right directory
if [ ! -d "frontend/book-website" ]; then
  echo "❌ Error: This script must be run from the project root directory"
  exit 1
fi

echo "✅ Verified project structure"

# Install dependencies
echo "📦 Installing frontend dependencies..."
cd frontend/book-website
npm install

# Run tests
echo "🧪 Running tests..."
npm test

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo ""
  echo "📋 Next steps for Vercel deployment:"
  echo "1. Push your code to GitHub"
  echo "2. Go to https://vercel.com/dashboard"
  echo "3. Click 'New Project'"
  echo "4. Import your repository"
  echo "5. Select root directory as '/frontend/book-website'"
  echo "6. Set build command to 'npm run build'"
  echo "7. Set output directory to 'build'"
  echo "8. Add environment variables from .env.example"
  echo ""
  echo "📝 Don't forget to set REACT_APP_API_BASE_URL to your backend URL"
else
  echo "❌ Build failed. Please check the errors above."
  exit 1
fi