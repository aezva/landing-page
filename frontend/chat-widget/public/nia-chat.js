(function() {
  // Crear el elemento contenedor si no existe
  if (!document.getElementById('nia-chat-widget')) {
    const container = document.createElement('div');
    container.id = 'nia-chat-widget';
    document.body.appendChild(container);
  }

  // Estilos del widget
  const styles = `
    .chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .chat-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #4F46E5;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }

    .chat-toggle:hover {
      background-color: #6366F1;
      transform: scale(1.1);
    }

    .chat-container {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 350px;
      height: 500px;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chat-header {
      padding: 15px;
      background-color: #4F46E5;
      color: white;
      text-align: center;
    }

    .chat-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #F9FAFB;
    }

    .message {
      max-width: 80%;
      padding: 10px 15px;
      border-radius: 15px;
      word-wrap: break-word;
    }

    .message.user {
      align-self: flex-end;
      background-color: #4F46E5;
      color: white;
      border-bottom-right-radius: 5px;
    }

    .message.assistant {
      align-self: flex-start;
      background-color: #F3F4F6;
      color: #1F2937;
      border-bottom-left-radius: 5px;
    }

    .message.system {
      align-self: center;
      background-color: #FF6B6B;
      color: white;
      font-size: 0.9em;
    }

    .chat-input {
      padding: 15px;
      border-top: 1px solid #E5E7EB;
      display: flex;
      gap: 10px;
      background-color: #FFFFFF;
    }

    .chat-input input {
      flex: 1;
      padding: 10px;
      border: 1px solid #E5E7EB;
      border-radius: 5px;
      outline: none;
      background-color: #F9FAFB;
      color: #1F2937;
    }

    .chat-input input:focus {
      border-color: #4F46E5;
    }

    .chat-input button {
      padding: 10px 15px;
      background-color: #4F46E5;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .chat-input button:hover {
      background-color: #6366F1;
    }

    .chat-input button:disabled {
      background-color: #9CA3AF;
      cursor: not-allowed;
    }

    .typing-indicator {
      display: flex;
      gap: 5px;
      padding: 10px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background-color: #9CA3AF;
      border-radius: 50%;
      animation: typing 1s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `;

  // Agregar estilos al documento
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Componente del widget
  class ChatWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.messages = [];
      this.isOpen = false;
      this.isLoading = false;
    }

    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <div class="chat-widget">
          <button class="chat-toggle">💬</button>
          ${this.isOpen ? `
            <div class="chat-container">
              <div class="chat-header">
                <h3>NIA Asistente</h3>
              </div>
              <div class="chat-messages">
                ${this.messages.map(msg => `
                  <div class="message ${msg.role}">${msg.content}</div>
                `).join('')}
                ${this.isLoading ? `
                  <div class="message assistant">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ` : ''}
              </div>
              <div class="chat-input">
                <input type="text" placeholder="Escribe tu mensaje...">
                <button>Enviar</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    setupEventListeners() {
      const toggle = this.shadowRoot.querySelector('.chat-toggle');
      const input = this.shadowRoot.querySelector('input');
      const button = this.shadowRoot.querySelector('button');

      toggle.addEventListener('click', () => {
        this.isOpen = !this.isOpen;
        this.render();
        this.setupEventListeners();
      });

      const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        this.messages.push({ role: 'user', content: text });
        input.value = '';
        this.isLoading = true;
        this.render();
        this.setupEventListeners();

        try {
          const response = await fetch('https://nia-backend-production.up.railway.app/api/v1/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: 'user', content: text }),
          });

          const data = await response.json();
          if (response.ok) {
            this.messages.push({ role: 'assistant', content: data.response });
          } else {
            throw new Error(data.detail || 'Error al procesar el mensaje');
          }
        } catch (error) {
          this.messages.push({ role: 'system', content: `Error: ${error.message}` });
        } finally {
          this.isLoading = false;
          this.render();
          this.setupEventListeners();
        }
      };

      button.addEventListener('click', sendMessage);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }
  }

  // Registrar el componente
  customElements.define('nia-chat', ChatWidget);

  // Crear y agregar el widget
  const widget = document.createElement('nia-chat');
  document.getElementById('nia-chat-widget').appendChild(widget);
})(); 