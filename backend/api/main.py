from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from .auth.routes import router as auth_router
from .chat.routes import router as chat_router
from .personalization.routes import router as personalization_router
from .translation.routes import router as translation_router

app = FastAPI(
    title="AI Interactive Book API",
    description="Backend API for the AI Interactive Book platform",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(personalization_router, prefix="/api/personalize", tags=["Personalization"])
app.include_router(translation_router, prefix="/api/translate", tags=["Translation"])

@app.get("/")
async def root():
    return {"message": "AI Interactive Book API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)