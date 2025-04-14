document.addEventListener("DOMContentLoaded", function () {
  const container = document.createElement("div");
  container.id = "nia-widget-container";

  container.innerHTML = `
    <div id="nia-welcome-bubble">¡Hola! ¿En qué puedo ayudarte?</div>
    <button id="nia-floating-icon"></button>
    <div id="nia-notification-badge">1</div>
    <div id="nia-chat-box">
      <div id="nia-chat-header">
        <div style="display: flex; align-items: center;">
          <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" />
          NIA Assistant
        </div>
        <button id="nia-minimize-button">─</button>
      </div>
      <div id="nia-chat-messages"></div>
      <div id="nia-chat-input-area">
        <input type="text" id="nia-chat-input" placeholder="Escribe un mensaje..." />
        <button id="nia-send-button">Enviar</button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const floatingIcon = document.getElementById("nia-floating-icon");
  const chatBox = document.getElementById("nia-chat-box");
  const sendButton = document.getElementById("nia-send-button");
  const input = document.getElementById("nia-chat-input");
  const messages = document.getElementById("nia-chat-messages");
  const minimizeBtn = document.getElementById("nia-minimize-button");
  const welcomeBubble = document.getElementById("nia-welcome-bubble");
  const notificationBadge = document.getElementById("nia-notification-badge");

  let hasInteracted = false;
  let welcomeSent = false;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function addMessage(text, from) {
    const div = document.createElement("div");
    div.className = from === "nia" ? "nia-message" : "user-message";
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function openChat() {
    chatBox.style.display = "flex";
    welcomeBubble.style.display = "none";
    notificationBadge.style.display = "none";
    if (!welcomeSent) {
      addMessage("¡Hola! ¿En qué puedo ayudarte?", "nia");
      welcomeSent = true;
    }
  }

  function minimizeChat() {
    chatBox.style.display = "none";
    if (!hasInteracted) {
      if (!isMobile()) {
        welcomeBubble.style.display = "block";
      } else {
        notificationBadge.style.display = "block";
      }
    }
  }

  function sendMessage() {
    const text = input.value.trim();
    if (text !== "") {
      addMessage(text, "user");
      input.value = "";
      hasInteracted = true;
      notificationBadge.style.display = "none";

      console.log("🌍 Enviando dominio:", window.location.hostname);

      // 🔁 Llama al backend de NIA
      fetch("https://niabackend-production.up.railway.app/nia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          lang: "es",
          domain: window.location.hostname
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          addMessage(data.response, "nia");
        })
        .catch((error) => {
          console.error("❌ Error al contactar con NIA:", error);
          addMessage("Ups, no pude responder ahora. Intenta más tarde.", "nia");
        });
    }
  }

  floatingIcon.addEventListener("click", openChat);
  welcomeBubble.addEventListener("click", openChat);
  minimizeBtn.addEventListener("click", minimizeChat);
  sendButton.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Mostrar burbuja o badge según dispositivo
  if (!hasInteracted) {
    if (!isMobile()) {
      welcomeBubble.style.display = "block";
    } else {
      notificationBadge.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 18px;
        background-color: red;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        z-index: 10003;
        display: block;
        font-weight: bold;
      `;
    }
  }
}); 