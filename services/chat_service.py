from models.chat import ChatMessage, ChatResponse
import os
from openai import OpenAI

class ChatService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def process_message(self, message: ChatMessage) -> ChatResponse:
        try:
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": message.role, "content": message.content}]
            )
            return ChatResponse(
                response=response.choices[0].message.content,
                sources=[]
            )
        except Exception as e:
            raise Exception(f"Error procesando el mensaje: {str(e)}") 