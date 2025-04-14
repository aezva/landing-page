from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class DocumentMetadata(BaseModel):
    title: str
    author: Optional[str] = None
    date: Optional[datetime] = None
    source: Optional[str] = None
    tags: List[str] = []

class Document(BaseModel):
    id: str
    content: str
    metadata: DocumentMetadata 