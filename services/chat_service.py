from models.chat import ChatMessage, ChatResponse
import os
from openai import OpenAI

class ChatService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise Exception("OPENAI_API_KEY no está configurada")
        self.client = OpenAI(api_key=api_key)

    async def process_message(self, message: ChatMessage) -> ChatResponse:
        try:
            print(f"Procesando mensaje: {message.content}")  # Debug
            print(f"API Key: {os.getenv('OPENAI_API_KEY')[:5]}...")  # Debug (solo primeros 5 caracteres)
            
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": message.role, "content": message.content}]
            )
            
            print(f"Respuesta recibida: {response}")  # Debug
            
            return ChatResponse(
                response=response.choices[0].message.content,
                sources=[]
            )
        except Exception as e:
            print(f"Error detallado: {str(e)}")  # Debug
            raise Exception(f"Error procesando el mensaje: {str(e)}") 