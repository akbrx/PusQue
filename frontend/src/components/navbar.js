class MyNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const role = localStorage.getItem("userRole");

    let menuItems = `
      <li><a href="#/">Home</a></li>
    `;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }

        nav {
          background-color: #407BFF;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 99999;
        }

        .logo {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .menu {
          display: flex;
          list-style: none;
          gap: 1rem;
        }

        .menu li a {
          color: white;
          text-decoration: none;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }

        .hamburger div {
          width: 25px;
          height: 3px;
          background-color: white;
          margin: 4px 0;
        }

        @media (max-width: 768px) {
          .menu {
            display: none;
            flex-direction: column;
            background-color: #333;
            position: absolute;
            top: 60px;
            right: 20px;
            width: 150px;
            border: 1px solid #444;
            padding: 1rem;
          }

          .menu.show {
            display: flex;
          }

          .hamburger {
            display: flex;
          }
        }
      </style>

      <nav>
        <div class="logo">PusQue</div>

        <div class="hamburger" id="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul class="menu" id="menu">
          <li><a href="#/">Home</a></li>
          <li><a href="#/antrian">Antrian</a></li>
          <li><a href="#/daftar">Daftar</a></li>
          <li><a href="#/profile">Profil</a></li>
          <li><a href="#/login" id="logoutBtn">Logout</a></li>
          
        </ul>
      </nav>
    `;

    // Hamburger
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target.closest("#hamburger")) {
        const menu = this.shadowRoot.getElementById("menu");
        menu.classList.toggle("show");
      }
      // Logout
      if (e.target.id === "logoutBtn") {
        localStorage.removeItem('accessToken');
        window.location.hash = "#/login";
      }
    });
    // Hamburger toggle
    this.shadowRoot.querySelector("#hamburger").addEventListener("click", () => {
      const menu = this.shadowRoot.querySelector("#menu");
      menu.classList.toggle("show");
    });

    // Logout
    const logoutLink = this.shadowRoot.querySelector("#logout");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("userRole");
        location.hash = "#/";
        this.render(); // Refresh menu setelah logout
      });
    }
  }
}

customElements.define("my-navbar", MyNavbar);
