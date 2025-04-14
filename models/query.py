from pydantic import BaseModel
from typing import Optional, List

class Query(BaseModel):
    """Modelo para representar una consulta de búsqueda"""
    text: str
    filters: Optional[dict] = None
    limit: Optional[int] = 10
    offset: Optional[int] = 0
    fields: Optional[List[str]] = None 