import logoPusQue from "../assets/logo/logoPusQue.jpg";
import chatBot from "../assets/icons/chatBot.png";

class ChatView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        .container {
          display: flex;
          flex-direction: column;
          height: 85vh;
          max-width: 1000px;
          margin: 0 auto;
        }

        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .logo-wrapper {
          flex: 0 0 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          padding: 1rem;
        }

        .logo {
          width: 100%;
          max-width: 700px;
          height: auto;
        }

        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #fff;
        }

        .box-chat {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
        }

         .box-chat::-webkit-scrollbar {
          display: none;
        }

        .chat {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .chat.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .chat.user .bubble {
          background: #ccc;
          color: black;
        }

        .chat.bot .bubble {
          background: #2979ff;
          color: white;
        }

        .bubble {
          padding: 1rem;
          border-radius: 10px;
          max-width: 300px;
        }

        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }

        .input-area {
          display: flex;
          border-top: 1px solid #ccc;
          padding: 1rem;
        }

        .input-area input {
          flex: 1;
          border: 1px solid #ccc;
          border-radius: 20px;
          padding: 0.8rem;
          font-size: 1rem;
          outline: none;
        }

        .input-area button {
          background: #2979ff;
          border: none;
          border-radius: 20px;
          margin-left: 0.5rem;
          padding: 0 1.2rem;
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .logo-wrapper {
            display: none;
          }
          .container {
            height : 90vh;
          }
        }
      </style>

      <div class="container">
        <div class="main-content">
          <div class="logo-wrapper">
            <img class="logo" src="${logoPusQue}" alt="Logo PusQue" />
          </div>
          <div class="chat-area">
            <div class="box-chat" id="chatBox">
              ${this.renderMessages()}
            </div>
            <div class="input-area">
              <input type="text" placeholder="Tulis pesan..." />
              <button>&#10148;</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderMessages() {
    return `
      <div class="chat bot">
        <img class="icon" src="${chatBot}" alt="Bot Icon" />
        <div class="bubble">Halo! Ada yang bisa saya bantu?</div>
      </div>
      <div class="chat user">
        <div class="bubble">Jam buka puskesmas kapan?</div>
      </div>
      <div class="chat bot">
        <img class="icon" src="${chatBot}" alt="Bot Icon" />
        <div class="bubble">Senin - Jumat, pukul 07.30 sampai 14.00 WIB</div>
      </div>
      <div class="chat user">
        <div class="bubble">Terima kasih!</div>
      </div>
      <div class="chat bot">
        <img class="icon" src="${chatBot}" alt="Bot Icon" />
        <div class="bubble">Halo! Ada yang bisa saya bantu?</div>
      </div>
      <div class="chat user">
        <div class="bubble">Jam buka puskesmas kapan?</div>
      </div>
      <div class="chat bot">
        <img class="icon" src="${chatBot}" alt="Bot Icon" />
        <div class="bubble">Senin - Jumat, pukul 07.30 sampai 14.00 WIB</div>
      </div>
      <div class="chat user">
        <div class="bubble">Terima kasih!</div>
      </div>
    `;
  }

  connectedCallback() {
    const chatBox = this.shadowRoot.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

customElements.define("chat-view", ChatView);
