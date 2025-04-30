interface Message {
  content: string;
  timestamp: string;
  metadata: {
    source: string;
    thread_id: string;
    role: string;
  };
}

class ChatService {
  private API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  private currentThreadId: string | null = null;

  async sendMessage(content: string): Promise<Message> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          thread_id: this.currentThreadId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      const data = await response.json();
      this.currentThreadId = data.metadata.thread_id;
      return data;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw error;
    }
  }

  async getThreadMessages(threadId: string): Promise<Message[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/chat/thread/${threadId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los mensajes del thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
      throw error;
    }
  }
}

export default ChatService; 