from fastapi import APIRouter, HTTPException
from typing import List
from models.chat import ChatMessage, ChatResponse
from services.chat_service import ChatService
import traceback

router = APIRouter()
chat_service = ChatService()

@router.post("/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    try:
        print(f"Recibido mensaje: {message}")  # Debug
        response = await chat_service.process_message(message)
        print(f"Respuesta enviada: {response}")  # Debug
        return response
    except Exception as e:
        print(f"Error en la ruta: {str(e)}")  # Debug
        print(f"Traceback: {traceback.format_exc()}")  # Debug
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "healthy"} 