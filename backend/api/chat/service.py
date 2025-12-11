from sqlalchemy.orm import Session
from ..database.models import ChatLog
from ..ai.openai_service import get_openai_response
from ..database.models import User

def process_chat_query(db: Session, user_id: int, query: str, context: str = None):
    # Get user profile for personalization
    user = db.query(User).filter(User.id == user_id).first()
    
    # Prepare the prompt with user context
    system_prompt = f"""
    You are an AI assistant helping with an interactive book about AI-powered learning.
    The user has the following profile:
    - Software Experience: {user.software_experience}
    - Hardware Experience: {user.hardware_experience}
    - Learning Style: {user.learning_style}
    
    Please provide helpful, accurate responses to questions about the book content.
    """
    
    if context:
        prompt = f"""
        User Question: {query}
        
        Relevant Book Content:
        {context}
        
        Please answer the user's question based on the provided content.
        """
    else:
        prompt = f"User Question: {query}"
    
    # Get response from OpenAI
    response = get_openai_response(system_prompt, prompt)
    
    # Log the chat interaction
    chat_log = ChatLog(
        user_id=user_id,
        query=query,
        response=response
    )
    db.add(chat_log)
    db.commit()
    
    return response