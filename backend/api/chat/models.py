from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    query: str
    context: Optional[str] = None  # Selected text from the user

class ChatResponse(BaseModel):
    response: str