from typing import Optional, Dict
from fastapi import HTTPException
from supabase import create_client, Client
import os

class ClientService:
    def __init__(self):
        self.supabase: Client = create_client(
            os.getenv("SUPABASE_URL", ""),
            os.getenv("SUPABASE_KEY", "")
        )

    async def validate_client(self, client_id: str) -> Dict:
        """
        Valida si un clientID es válido consultando la base de datos
        """
        try:
            result = self.supabase.table("clients").select("*").eq("client_id", client_id).execute()
            
            if not result.data:
                return {"valid": False}
            
            client = result.data[0]
            return {
                "valid": True,
                "client_name": client.get("name"),
                "company": client.get("company")
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_client_info(self, client_id: str) -> Dict:
        """
        Obtiene información detallada del cliente
        """
        try:
            result = self.supabase.table("clients").select("*").eq("client_id", client_id).execute()
            
            if not result.data:
                raise HTTPException(status_code=404, detail="Client not found")
            
            client = result.data[0]
            return {
                "name": client.get("name"),
                "email": client.get("email"),
                "company": client.get("company"),
                "plan": client.get("plan"),
                "status": client.get("status")
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def save_chat_message(self, client_id: str, message: str, platform: str, conversation_id: Optional[str] = None) -> Dict:
        """
        Guarda un mensaje de chat en la base de datos
        """
        try:
            result = self.supabase.table("chat_messages").insert({
                "client_id": client_id,
                "message": message,
                "platform": platform,
                "conversation_id": conversation_id
            }).execute()
            
            return {
                "status": "success",
                "message_id": result.data[0]["id"]
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e)) 