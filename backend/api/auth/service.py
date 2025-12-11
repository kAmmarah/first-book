from sqlalchemy.orm import Session
from . import models
from ..database.models import User
from better_auth import BetterAuth
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize BetterAuth
auth = BetterAuth(
    secret=os.getenv("BETTER_AUTH_SECRET", "fallback-secret-key"),
    database_url=os.getenv("DATABASE_URL", "sqlite:///./test.db"),
    email_verification=False,  # Set to True in production
)

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user_with_profile(db: Session, user: models.UserCreate):
    # Create user in BetterAuth
    auth_user = auth.register(
        email=user.email,
        password=user.password
    )
    
    # Create user profile in our database
    db_user = User(
        email=user.email,
        hashed_password=auth_user.hashed_password,  # Store the hashed password from BetterAuth
        software_experience=user.software_experience,
        hardware_experience=user.hardware_experience,
        learning_style=user.learning_style
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user_with_better_auth(email: str, password: str):
    try:
        # Authenticate with BetterAuth
        auth_user = auth.login(
            email=email,
            password=password
        )
        return auth_user
    except Exception as e:
        print(f"Authentication failed: {str(e)}")
        return None