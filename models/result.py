from pydantic import BaseModel
from typing import List, Optional
from .document import Document

class SearchResult(BaseModel):
    """Modelo para representar el resultado de una búsqueda"""
    documents: List[Document]
    total: int
    page: Optional[int] = 1
    total_pages: Optional[int] = 1
    query_time: Optional[float] = None 