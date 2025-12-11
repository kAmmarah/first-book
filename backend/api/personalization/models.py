from pydantic import BaseModel

class PersonalizationRequest(BaseModel):
    content: str

class PersonalizationResponse(BaseModel):
    personalized_content: str