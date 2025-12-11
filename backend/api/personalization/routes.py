from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from . import models, service
from ..auth.models import UserResponse
from ..utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=models.PersonalizationResponse)
async def personalize_content(
    request: models.PersonalizationRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    personalized_content = service.personalize_chapter_content(
        db=db,
        user_id=current_user.id,
        content=request.content
    )
    return {"personalized_content": personalized_content}