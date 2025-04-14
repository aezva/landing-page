(function() {
  // Crear el elemento contenedor si no existe
  if (!document.getElementById('nia-chat-widget')) {
    const container = document.createElement('div');
    container.id = 'nia-chat-widget';
    document.body.appendChild(container);
  }

  // Cargar el script principal
  const script = document.createElement('script');
  script.src = 'https://nia-alvaros-projects-6b18c4d2.vercel.app/static/js/main.6598826b.js';
  script.async = true;
  script.onload = function() {
    console.log('NIA Chat Widget cargado correctamente');
  };
  script.onerror = function() {
    console.error('Error al cargar NIA Chat Widget');
  };
  document.body.appendChild(script);

  // Configuración del widget
  window.niaChatConfig = {
    apiUrl: 'https://nia-backend-production.up.railway.app',
    initialMessage: '¡Hola! Soy NIA, tu asistente de IA. ¿En qué puedo ayudarte hoy?',
    theme: {
      primaryColor: '#4F46E5',
      secondaryColor: '#6366F1',
      textColor: '#1F2937',
      backgroundColor: '#FFFFFF',
      botMessageColor: '#F3F4F6',
      userMessageColor: '#4F46E5',
      inputBackgroundColor: '#F9FAFB',
      inputTextColor: '#1F2937',
      buttonColor: '#4F46E5',
      buttonTextColor: '#FFFFFF'
    }
  };
})(); 