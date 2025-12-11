from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from . import models, service
from ..auth.models import UserResponse
from ..utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=models.ChatResponse)
async def chat_with_bot(
    request: models.ChatRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    response = service.process_chat_query(
        db=db,
        user_id=current_user.id,
        query=request.query,
        context=request.context
    )
    return {"response": response}