from sqlalchemy.orm import Session
from ..database.models import User
from ..ai.openai_service import get_openai_response

def personalize_chapter_content(db: Session, user_id: int, content: str):
    # Get user profile for personalization
    user = db.query(User).filter(User.id == user_id).first()
    
    # Create a prompt for personalizing the content
    system_prompt = f"""
    You are an AI assistant that personalizes educational content based on user profiles.
    The user has the following profile:
    - Software Experience: {user.software_experience}
    - Hardware Experience: {user.hardware_experience}
    - Learning Style: {user.learning_style}
    
    Please adapt the provided content to better suit this user's profile.
    Make the content more relevant and engaging for them.
    """
    
    prompt = f"""
    Please personalize the following chapter content for the user:
    
    {content}
    
    Adapt the examples, explanations, and tone to match their experience level and learning style.
    """
    
    # Get personalized content from OpenAI
    personalized_content = get_openai_response(system_prompt, prompt)
    
    return personalized_content