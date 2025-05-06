from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from core.settings import Settings
from core.client_service import ClientService
from pydantic import BaseModel
from typing import Optional, List
import uuid

settings = Settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos
class ClientValidation(BaseModel):
    valid: bool
    client_name: Optional[str] = None

class ChatMessage(BaseModel):
    message: str
    platform: str
    conversationID: Optional[str] = None

class ClientInfo(BaseModel):
    name: str
    email: str
    company: Optional[str] = None

# Dependencias
def get_client_service():
    return ClientService()

# Endpoints
@app.get("/client/validate")
async def validate_client(
    clientID: str,
    client_service: ClientService = Depends(get_client_service)
) -> ClientValidation:
    """
    Valida si un clientID es válido y retorna información básica del cliente
    """
    if not clientID:
        raise HTTPException(status_code=400, detail="clientID is required")
    
    result = await client_service.validate_client(clientID)
    return ClientValidation(
        valid=result["valid"],
        client_name=result.get("client_name")
    )

@app.get("/client/info")
async def get_client_info(
    clientID: str,
    client_service: ClientService = Depends(get_client_service)
) -> ClientInfo:
    """
    Obtiene información detallada del cliente
    """
    if not clientID:
        raise HTTPException(status_code=400, detail="clientID is required")
    
    result = await client_service.get_client_info(clientID)
    return ClientInfo(
        name=result["name"],
        email=result["email"],
        company=result.get("company")
    )

@app.post("/chat/message")
async def send_chat_message(
    message: ChatMessage,
    clientID: str,
    client_service: ClientService = Depends(get_client_service)
) -> dict:
    """
    Procesa y guarda un mensaje de chat
    """
    if not clientID:
        raise HTTPException(status_code=400, detail="clientID is required")
    
    result = await client_service.save_chat_message(
        clientID,
        message.message,
        message.platform,
        message.conversationID
    )
    
    return {
        "status": "success",
        "message_id": result["message_id"]
    }

@app.get("/")
def read_root():
    return {"message": "Hello from NNIA backend!"}

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT) 