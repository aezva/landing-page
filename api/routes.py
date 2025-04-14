from fastapi import APIRouter, HTTPException
from typing import List
from models.chat import ChatMessage, ChatResponse
from services.chat_service import ChatService

router = APIRouter()
chat_service = ChatService()

@router.post("/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    try:
        response = await chat_service.process_message(message)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "healthy"} 