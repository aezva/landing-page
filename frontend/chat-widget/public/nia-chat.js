(function() {
  // Crear el elemento contenedor si no existe
  if (!document.getElementById('nia-widget-container')) {
    const container = document.createElement('div');
    container.id = 'nia-widget-container';
    document.body.appendChild(container);
  }

  // Estilos del widget
  const styles = `
    #nia-widget-container {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 999999 !important;
    }

    .nia-chat-widget {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 999999 !important;
    }

    .nia-chat-toggle {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background-color: #4F46E5 !important;
      color: white !important;
      border: none !important;
      cursor: pointer !important;
      font-size: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.3s ease !important;
    }

    .nia-chat-toggle:hover {
      background-color: #6366F1 !important;
      transform: scale(1.1) !important;
    }

    .nia-chat-container {
      position: absolute !important;
      bottom: 70px !important;
      right: 0 !important;
      width: 350px !important;
      height: 500px !important;
      background-color: #FFFFFF !important;
      border-radius: 10px !important;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }

    .nia-chat-header {
      padding: 15px !important;
      background-color: #4F46E5 !important;
      color: white !important;
      text-align: center !important;
    }

    .nia-chat-header h3 {
      margin: 0 !important;
      font-size: 1.2em !important;
      font-weight: 600 !important;
    }

    .nia-chat-messages {
      flex: 1 !important;
      padding: 15px !important;
      overflow-y: auto !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      background-color: #F9FAFB !important;
    }

    .nia-message {
      max-width: 80% !important;
      padding: 10px 15px !important;
      border-radius: 15px !important;
      word-wrap: break-word !important;
      font-family: system-ui, -apple-system, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
    }

    .nia-message.user {
      align-self: flex-end !important;
      background-color: #4F46E5 !important;
      color: white !important;
      border-bottom-right-radius: 5px !important;
    }

    .nia-message.assistant {
      align-self: flex-start !important;
      background-color: #F3F4F6 !important;
      color: #1F2937 !important;
      border-bottom-left-radius: 5px !important;
    }

    .nia-message.system {
      align-self: center !important;
      background-color: #FF6B6B !important;
      color: white !important;
      font-size: 0.9em !important;
    }

    .nia-chat-input {
      padding: 15px !important;
      border-top: 1px solid #E5E7EB !important;
      display: flex !important;
      gap: 10px !important;
      background-color: #FFFFFF !important;
    }

    .nia-chat-input input {
      flex: 1 !important;
      padding: 10px !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 5px !important;
      outline: none !important;
      background-color: #F9FAFB !important;
      color: #1F2937 !important;
      font-family: system-ui, -apple-system, sans-serif !important;
      font-size: 14px !important;
    }

    .nia-chat-input input:focus {
      border-color: #4F46E5 !important;
    }

    .nia-chat-input button {
      padding: 10px 15px !important;
      background-color: #4F46E5 !important;
      color: white !important;
      border: none !important;
      border-radius: 5px !important;
      cursor: pointer !important;
      transition: background-color 0.3s ease !important;
      font-family: system-ui, -apple-system, sans-serif !important;
      font-size: 14px !important;
      font-weight: 500 !important;
    }

    .nia-chat-input button:hover {
      background-color: #6366F1 !important;
    }

    .nia-chat-input button:disabled {
      background-color: #9CA3AF !important;
      cursor: not-allowed !important;
    }

    .nia-typing-indicator {
      display: flex !important;
      gap: 5px !important;
      padding: 10px !important;
    }

    .nia-typing-indicator span {
      width: 8px !important;
      height: 8px !important;
      background-color: #9CA3AF !important;
      border-radius: 50% !important;
      animation: typing 1s infinite ease-in-out !important;
    }

    .nia-typing-indicator span:nth-child(2) {
      animation-delay: 0.2s !important;
    }

    .nia-typing-indicator span:nth-child(3) {
      animation-delay: 0.4s !important;
    }

    @keyframes typing {
      0%, 100% {
        transform: translateY(0) !important;
      }
      50% {
        transform: translateY(-5px) !important;
      }
    }
  `;

  // Agregar estilos al documento
  if (!document.getElementById('nia-chat-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'nia-chat-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  // Componente del widget
  class ChatWidget extends HTMLElement {
    constructor() {
      super();
      this.messages = [];
      this.isOpen = false;
      this.isLoading = false;
      this.welcomeShown = false;
    }

    connectedCallback() {
      this.render();
      this.setupEventListeners();
      this.showWelcomeBubble();
    }

    showWelcomeBubble() {
      if (this.messages.length === 0) {
        const welcomeBubble = this.querySelector('#nia-welcome-bubble');
        if (welcomeBubble) {
          welcomeBubble.style.display = 'block';
          this.welcomeShown = true;
        }
      }
    }

    hideWelcomeBubble() {
      const welcomeBubble = this.querySelector('#nia-welcome-bubble');
      if (welcomeBubble) {
        welcomeBubble.style.display = 'none';
        this.welcomeShown = false;
      }
    }

    openChat() {
      this.isOpen = true;
      this.hideWelcomeBubble();
      this.render();
      this.setupEventListeners();
    }

    closeChat() {
      this.isOpen = false;
      if (this.messages.length === 0) {
        this.welcomeShown = false;
        this.showWelcomeBubble();
      }
      this.render();
      this.setupEventListeners();
    }

    render() {
      this.innerHTML = `
        <div id="nia-widget-container">
          <button id="nia-floating-icon"></button>
          <div id="nia-welcome-bubble" style="display: none;">¡Hola! ¿En qué puedo ayudarte?</div>
          ${this.isOpen ? `
            <div id="nia-chat-box" style="display: flex;">
              <div id="nia-chat-header">
                <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA">
                <span>NIA Asistente</span>
                <button id="nia-minimize-button">_</button>
              </div>
              <div id="nia-chat-messages">
                ${this.messages.map(msg => `
                  <div class="${msg.role === 'user' ? 'user-message' : 'nia-message'}">${msg.content}</div>
                `).join('')}
                ${this.isLoading ? `
                  <div class="nia-message">
                    <div class="nia-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ` : ''}
              </div>
              <div id="nia-chat-input-area">
                <input type="text" id="nia-chat-input" placeholder="Escribe tu mensaje...">
                <button id="nia-send-button">Enviar</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    setupEventListeners() {
      const icon = this.querySelector('#nia-floating-icon');
      const input = this.querySelector('#nia-chat-input');
      const button = this.querySelector('#nia-send-button');
      const minimize = this.querySelector('#nia-minimize-button');
      const welcomeBubble = this.querySelector('#nia-welcome-bubble');

      if (icon) {
        icon.addEventListener('click', () => {
          this.openChat();
        });
      }

      if (welcomeBubble) {
        welcomeBubble.addEventListener('click', () => {
          this.openChat();
        });
      }

      if (minimize) {
        minimize.addEventListener('click', () => {
          this.closeChat();
        });
      }

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

      if (button) {
        button.addEventListener('click', sendMessage);
      }

      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendMessage();
        });
      }
    }
  }

  // Registrar el componente
  customElements.define('nia-chat', ChatWidget);

  // Crear y agregar el widget
  const widget = document.createElement('nia-chat');
  document.getElementById('nia-widget-container').appendChild(widget);
})(); 