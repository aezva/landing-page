from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = None 