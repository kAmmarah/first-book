from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from . import models, service
from ..utils.auth import create_access_token, get_current_user

router = APIRouter()

@router.post("/signup", response_model=models.Token)
async def signup(user: models.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user with profile
    new_user = service.create_user_with_profile(db, user)
    
    # Create access token
    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signin", response_model=models.Token)
async def signin(user: models.UserLogin):
    # Authenticate user with BetterAuth
    auth_user = service.authenticate_user_with_better_auth(user.email, user.password)
    if not auth_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/profile", response_model=models.UserResponse)
async def get_profile(current_user: models.UserResponse = Depends(get_current_user)):
    return current_user