from pydantic import BaseModel

class TranslationRequest(BaseModel):
    text: str
    target_language: str = "ur"  # Default to Urdu

class TranslationResponse(BaseModel):
    translated_text: str