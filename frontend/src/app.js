import "./components/navbar.js";
import "./pages/homePage.js";
import "./components/feedBack.js";
import "./pages/antrianPage.js";
import "./pages/formPendaftaranAntrian.js";
import "./pages/profile.js";
import "./pages/chatBot.js";

// Routing mapping
const routes = {
  "/": "<pusque-page></pusque-page>",
  "/antrian": "<antrian-puskesmas></antrian-puskesmas>",
  "/daftar": "<daftar-antrian-form></daftar-antrian-form>",
  "/profile": "<profile-view></profile-view>",
  "/chatbot": "<chat-bot></chat-bot>",
};

// Routing handler
function router() {
  const path = location.hash.slice(1) || "/";
  const app = document.getElementById("app");
  app.innerHTML = routes[path] || "<h1>404 - Halaman tidak ditemukan</h1>";
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
