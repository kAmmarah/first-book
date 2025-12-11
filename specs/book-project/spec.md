# AI-Driven Interactive Book Project Specification

## Overview
This document outlines the requirements and specifications for an AI-driven interactive book project that combines structured writing, authentication, personalization, and AI-powered features.

## Project Goals
1. Create a complete interactive book website using Docusaurus
2. Implement AI-powered features including RAG chatbot, personalization, and translation
3. Provide user authentication with profile collection
4. Enable easy deployment to GitHub Pages
5. Create reusable AI agent skills for content enhancement

## Core Features

### 1. AI/Spec Writing System
- Use Spec-Kit Plus to structure all book chapters
- Auto-generate markdown files for book content
- Provide Docusaurus folder structure
- Include instructions for publishing to GitHub Pages

### 2. Embedded RAG Chatbot
- FastAPI backend for API services
- OpenAI Agents / ChatKit SDK for inference
- Qdrant Cloud for vector database (embeddings of book chapters)
- Neon Serverless Postgres for logs and user profiles
- Chatbot capabilities:
  - Answer general questions about the book
  - Answer questions using only text selected by the user (client-side context extraction)
- Auto-generated API endpoints and client-side React component

### 3. Better-Auth Signup/Signin
- Full authentication flow implementation
- At signup collect:
  - Software experience level
  - Hardware experience level
  - Preferred learning style
- Store user data in Neon Postgres

### 4. Personalization Button
- "Personalize Chapter for Me" button at top of each chapter
- Calls FastAPI endpoint to personalize visible chapter content
- Personalization based on user profile from Neon Postgres

### 5. Urdu Translation Button
- "Translate to Urdu" button at top of every chapter
- Use Gemini/OpenAI translation API
- Render Urdu version inline without page reload

### 6. Reusable Intelligence (Agent Skills)
- Create Claude Code Subagents
- Develop reusable Agent Skills:
  - Summarizer
  - Explainer
  - Code generator
  - Difficulty adjuster
  - Translator (Urdu/English)
  - Quiz generator
  - Example generator

## Technical Requirements

### Frontend
- Docusaurus v3.x for static site generation
- React components for interactive features
- TailwindCSS for styling
- TypeScript for type safety

### Backend
- FastAPI for REST API services
- Python 3.10+
- OpenAI SDK for AI services
- Qdrant client for vector database operations
- PostgreSQL client for Neon database

### Database
- Neon Serverless Postgres for user data and logs
- Qdrant Cloud (Free Tier) for vector embeddings

### Authentication
- Better-Auth for signup/signin flows
- JWT-based session management

### Deployment
- GitHub Pages for hosting the book website
- Docker containerization for backend services
- CI/CD pipeline with GitHub Actions

## User Experience

### Authentication Flow
1. User visits book website
2. Clicks "Sign Up" or "Sign In"
3. For sign up:
   - Enters email/password
   - Provides software/hardware experience levels
   - Selects preferred learning style
4. For sign in:
   - Enters credentials
5. Redirected to book homepage

### Content Interaction
1. User browses book chapters
2. At top of each chapter:
   - "Personalize Chapter for Me" button
   - "Translate to Urdu" button
3. Chatbot widget available on all pages
4. User can select text and ask chatbot questions about selection

## Security Requirements
- All user data encrypted at rest
- Passwords hashed with bcrypt
- JWT tokens with secure expiration
- API rate limiting
- CORS protection

## Performance Requirements
- Page load times under 2 seconds
- API response times under 500ms
- Chatbot response times under 2 seconds
- Mobile-responsive design

## Compliance
- GDPR-compliant data handling
- Accessibility standards (WCAG 2.1 AA)
- Privacy policy and terms of service

## Success Metrics
- User registration rate
- Chapter completion rate
- Chatbot usage frequency
- User satisfaction scores
- Page load performance