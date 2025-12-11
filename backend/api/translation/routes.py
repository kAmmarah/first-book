from fastapi import APIRouter
from . import models, service

router = APIRouter()

@router.post("/", response_model=models.TranslationResponse)
async def translate_text(request: models.TranslationRequest):
    translated_text = service.translate_content(
        text=request.text,
        target_language=request.target_language
    )
    return {"translated_text": translated_text}