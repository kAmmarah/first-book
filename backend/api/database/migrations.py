from sqlalchemy import create_engine
from .models import Base
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL from environment variables
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

def create_tables():
    """
    Create all tables defined in the models
    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

def drop_tables():
    """
    Drop all tables (use with caution!)
    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    Base.metadata.drop_all(bind=engine)
    print("Tables dropped successfully!")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "drop":
            drop_tables()
        elif sys.argv[1] == "create":
            create_tables()
        else:
            print("Usage: python migrations.py [create|drop]")
    else:
        create_tables()