(function() {
  // Configuración por defecto
  const defaultConfig = {
    clientId: null,
    apiUrl: 'https://nia-backend-production.up.railway.app/api/v1',
    widgetPosition: 'bottom-right',
    primaryColor: '#4F46E5',
    welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?',
  };

  // Cargar configuración del cliente
  function loadConfig() {
    const script = document.currentScript;
    const config = {
      ...defaultConfig,
      ...(script ? JSON.parse(script.getAttribute('data-config') || '{}') : {})
    };

    if (!config.clientId) {
      console.error('NIA Widget: Se requiere un clientId para inicializar el widget');
      return null;
    }

    return config;
  }

  // Verificar si el widget ya está cargado
  if (window.NIAWidget) {
    console.warn('NIA Widget: El widget ya está cargado en esta página');
    return;
  }

  // Crear el elemento contenedor si no existe
  if (!document.getElementById('nia-widget-container')) {
    const container = document.createElement('div');
    container.id = 'nia-widget-container';
    document.body.appendChild(container);
  }

  // Estilos del widget
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    #nia-widget-container {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 999999 !important;
    }

    #nia-floating-icon {
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

    #nia-floating-icon:hover {
      background-color: #6366F1 !important;
      transform: scale(1.1) !important;
    }

    #nia-chat-box {
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

    #nia-chat-header {
      padding: 15px !important;
      background-color: #4F46E5 !important;
      color: white !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
    }

    .nia-header-content {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
    }

    .nia-header-content img {
      width: 30px !important;
      height: 30px !important;
      border-radius: 50% !important;
    }

    .nia-header-content span {
      font-size: 1.2em !important;
      font-weight: bold !important;
    }

    #nia-minimize-button {
      background: none !important;
      border: none !important;
      color: white !important;
      font-size: 1.5em !important;
      cursor: pointer !important;
    }

    #nia-chat-messages {
      flex: 1 !important;
      padding: 15px !important;
      overflow-y: auto !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
    }

    .user-message {
      align-self: flex-end !important;
      background-color: #4F46E5 !important;
      color: white !important;
      padding: 10px 15px !important;
      border-radius: 15px 15px 0 15px !important;
      max-width: 80% !important;
    }

    .nia-message {
      align-self: flex-start !important;
      background-color: #F3F4F6 !important;
      color: #1F2937 !important;
      padding: 10px 15px !important;
      border-radius: 15px 15px 15px 0 !important;
      max-width: 80% !important;
    }

    #nia-chat-input-area {
      padding: 15px !important;
      display: flex !important;
      gap: 10px !important;
      border-top: 1px solid #E5E7EB !important;
    }

    #nia-chat-input {
      flex: 1 !important;
      padding: 10px !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 5px !important;
      outline: none !important;
    }

    #nia-chat-input:focus {
      border-color: #4F46E5 !important;
    }

    #nia-send-button {
      padding: 10px 20px !important;
      background-color: #4F46E5 !important;
      color: white !important;
      border: none !important;
      border-radius: 5px !important;
      cursor: pointer !important;
    }

    #nia-send-button:hover {
      background-color: #6366F1 !important;
    }

    #nia-welcome-bubble {
      position: absolute !important;
      bottom: 70px !important;
      right: 0 !important;
      background-color: white !important;
      padding: 15px !important;
      border-radius: 10px !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
      max-width: 250px !important;
      cursor: pointer !important;
    }

    .nia-typing-indicator {
      display: flex !important;
      gap: 5px !important;
    }

    .nia-typing-indicator span {
      width: 8px !important;
      height: 8px !important;
      background-color: #9CA3AF !important;
      border-radius: 50% !important;
      animation: typing 1s infinite !important;
    }

    .nia-typing-indicator span:nth-child(2) {
      animation-delay: 0.2s !important;
    }

    .nia-typing-indicator span:nth-child(3) {
      animation-delay: 0.4s !important;
    }

    @keyframes typing {
      0%, 100% { transform: translateY(0) !important; }
      50% { transform: translateY(-5px) !important; }
    }
  `;
  document.head.appendChild(styleSheet);

  // Componente del widget
  class ChatWidget extends HTMLElement {
    constructor() {
      super();
      this.config = loadConfig();
      if (!this.config) return;

      this.messages = [];
      this.isOpen = false;
      this.isLoading = false;
      this.welcomeMessageShown = false;
      this.sessionId = this.generateSessionId();
    }

    generateSessionId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    connectedCallback() {
      if (!this.config) return;
      this.render();
      this.setupEventListeners();
      this.showWelcomeBubble();
      this.initializeSession();
    }

    async initializeSession() {
      try {
        const response = await fetch(`${this.config.apiUrl}/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-ID': this.config.clientId
          },
          body: JSON.stringify({ sessionId: this.sessionId })
        });

        if (!response.ok) {
          throw new Error('Error al inicializar la sesión');
        }
      } catch (error) {
        console.error('NIA Widget: Error al inicializar la sesión:', error);
      }
    }

    showWelcomeBubble() {
      if (this.messages.length === 0) {
        const welcomeBubble = this.querySelector('#nia-welcome-bubble');
        if (welcomeBubble) {
          welcomeBubble.style.display = 'block';
        }
      }
    }

    hideWelcomeBubble() {
      const welcomeBubble = this.querySelector('#nia-welcome-bubble');
      if (welcomeBubble) {
        welcomeBubble.style.display = 'none';
      }
    }

    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.hideWelcomeBubble();
        if (!this.welcomeMessageShown && this.messages.length === 0) {
          this.messages.push({ role: 'assistant', content: this.config.welcomeMessage });
          this.welcomeMessageShown = true;
        }
      } else if (this.messages.length === 0) {
        this.showWelcomeBubble();
      }
      this.render();
      this.setupEventListeners();
    }

    render() {
      if (!this.config) return;

      this.innerHTML = `
        <div id="nia-widget-container" class="nia-widget-${this.config.widgetPosition}">
          <button id="nia-floating-icon" style="background-color: ${this.config.primaryColor}">N</button>
          <div id="nia-welcome-bubble" style="display: none;">${this.config.welcomeMessage}</div>
          ${this.isOpen ? `
            <div id="nia-chat-box" style="display: flex;">
              <div id="nia-chat-header" style="background-color: ${this.config.primaryColor}">
                <div class="nia-header-content">
                  <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA">
                  <span>NIA</span>
                </div>
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
                <button id="nia-send-button" style="background-color: ${this.config.primaryColor}">Enviar</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    setupEventListeners() {
      if (!this.config) return;

      const icon = this.querySelector('#nia-floating-icon');
      const input = this.querySelector('#nia-chat-input');
      const button = this.querySelector('#nia-send-button');
      const minimize = this.querySelector('#nia-minimize-button');
      const welcomeBubble = this.querySelector('#nia-welcome-bubble');

      if (icon) {
        icon.addEventListener('click', () => {
          this.toggleChat();
        });
      }

      if (welcomeBubble) {
        welcomeBubble.addEventListener('click', () => {
          this.toggleChat();
        });
      }

      if (minimize) {
        minimize.addEventListener('click', () => {
          this.toggleChat();
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
          const response = await fetch(`${this.config.apiUrl}/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Client-ID': this.config.clientId,
              'X-Session-ID': this.sessionId
            },
            body: JSON.stringify({ role: 'user', content: text }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Error del servidor: ${response.status}`);
          }

          const data = await response.json();
          this.messages.push({ role: 'assistant', content: data.response });
        } catch (error) {
          console.error('NIA Widget: Error al enviar mensaje:', error);
          let errorMessage = 'Lo siento, ha ocurrido un error al procesar tu mensaje. ';
          
          if (error.message.includes('Failed to fetch')) {
            errorMessage += 'No se pudo conectar con el servidor. Por favor, intenta más tarde.';
          } else {
            errorMessage += error.message;
          }
          
          this.messages.push({ role: 'system', content: errorMessage });
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

  // Exponer la API del widget
  window.NIAWidget = {
    init: (config) => {
      const script = document.currentScript;
      if (script) {
        script.setAttribute('data-config', JSON.stringify(config));
      }
    }
  };
})(); 