from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    software_experience = Column(String)  # beginner, intermediate, advanced
    hardware_experience = Column(String)  # beginner, intermediate, advanced
    learning_style = Column(String)       # visual, auditory, kinesthetic, reading/writing
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"<User(id='{self.id}', email='{self.email}')>"

class ChatLog(Base):
    __tablename__ = "chat_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    query = Column(Text)
    response = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"<ChatLog(id='{self.id}', user_id='{self.user_id}', timestamp='{self.timestamp}')>"