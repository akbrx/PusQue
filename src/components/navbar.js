class MyNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }
        nav {
          background-color: #333;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
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
        <div class="logo">
          <slot name="logo"></slot>
        </div>

        <div class="hamburger" id="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul class="menu" id="menu">
          <li><a href="#"><slot name="link1"></slot></a></li>
          <li><a href="#"><slot name="link2"></slot></a></li>
          <li><a href="#"><slot name="link3"></slot></a></li>
        </ul>
      </nav>
    `;

    // Hamburger
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target.closest("#hamburger")) {
        const menu = this.shadowRoot.getElementById("menu");
        menu.classList.toggle("show");
      }
    });
  }
}

customElements.define("my-navbar", MyNavbar);
