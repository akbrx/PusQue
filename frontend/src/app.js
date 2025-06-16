import "./components/navbar.js";
import "./components/navbar_a.js";
import "./pages/homePage.js";
import "./components/feedBack.js";
import "./pages/pasien/antrianPage.js";
import "./pages/pasien/formPendaftaranAntrian.js";
import "./pages/profile.js";
import { renderLoginForm } from './pages/auth/login.js';
import { renderRegisterForm } from './pages/auth/register.js';
import "./pages/pasien/chatBot.js";
import './pages/dokter/PasienListView.js';
import './pages/dokter/DetailPasienView.js';
import './pages/admin/AdminPengajuanList.js';
import './pages/admin/AdminDetailPengajuan.js';
import './pages/admin/AdminBeranda.js';
import './pages/loginPage.js';
import './pages/notFound/notFoundPage.js';
import './pages/auth/login.js';
import './pages/pasien/feedback-page.js';

import { authFetch } from "./fatchauth.js";


function isLoggedIn() {
  return !!localStorage.getItem('accessToken');
}


function router() {
  const app = document.getElementById('app');
  const hash = window.location.hash;
  app.innerHTML = '';

  if (!isLoggedIn()) {
    if (hash === "#/register") {
      renderRegisterForm(() => {
        window.location.hash = "#/login";
      });
      return;
    }
    renderLoginForm(() => {
      window.location.hash = "#/";
    });
    return;
  }

  const role = localStorage.getItem("userRole");

  const navbar = document.querySelector('my-navbar');
  if (navbar) {
    navbar.render();
  }

  if (hash === "" || hash === "#/" || hash === "#/home") {
    const home = document.createElement("pusque-page");
    app.appendChild(home);
  }

  else if (hash === "#/antrian" && role === "pasien") {
    const antrian = document.createElement("antrian-puskesmas");
    authFetch('https://serverpusque-production.up.railway.app/antrian')
      .then(res => res.json())
      .then(data => {
        antrian.data = data;
      })
      .catch(err => {
        antrian.innerHTML = `<p class="text-danger">Gagal memuat antrian</p>`;
        console.error(err);
      });
    app.appendChild(antrian);
  }

  else if (hash === "#/daftar" && role === "pasien") {
    const form = document.createElement("daftar-antrian-form");
    app.appendChild(form);
  }

  else if (hash === "#/profile") {
    const profile = document.createElement("profile-view");
    app.appendChild(profile);
  }

  else if (hash === "#/chatbot" && role === "pasien") {
    const chat = document.createElement("chat-view");
    app.appendChild(chat);
  }

  else if (hash === "#/dokter" && role === "dokter") {
    const listView = document.createElement("pasien-list-view");
    authFetch('https://serverpusque-production.up.railway.app/antrian')
      .then(res => res.json())
      .then(data => {
        listView.dataPasien = data;
      })
      .catch(err => {
        listView.innerHTML = `<p class="text-danger">Gagal memuat data pasien</p>`;
        console.error(err);
      });
    app.appendChild(listView);
  }

  else if (hash === "#/pengajuan" && role === "admin") {
    const adminList = document.createElement("admin-pengajuan-list");
    authFetch('https://serverpusque-production.up.railway.app')
      .then(res => res.json())
      .then(data => {
        adminList.dataPasien = data;
      })
      .catch(err => {
        adminList.innerHTML = `<p class="text-danger">Gagal memuat data antrian</p>`;
        console.error(err);
      });
    app.appendChild(adminList);
  }

  else if (hash === "#/beranda" && role === "admin") {
    const beranda = document.createElement("admin-beranda");
    app.appendChild(beranda);
  }

  else if (hash.startsWith('#/detailpasien/') && role === "dokter") {
    const id = parseInt(hash.split('/')[2]);
    const detailView = document.createElement("detail-pasien-view");
    authFetch(`https://serverpusque-production.up.railway.app/antrian/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Pasien tidak ditemukan');
        return res.json();
      })
      .then(data => {
        detailView.pasien = data;
        app.appendChild(detailView);
      })
      .catch(err => {
        app.innerHTML = "<h2>Pasien tidak ditemukan</h2>";
        console.error(err);
      });
  }

  else if (hash.startsWith('#/detailpengajuan/') && role === "admin") {
    const detailPengajuan = document.createElement("admin-detail-pengajuan");
    app.appendChild(detailPengajuan);
  }

  else if (hash === "#/login") {
    const login = document.createElement("login-page");
    app.appendChild(login);
  }

  else if (hash === "#/feedback" && role === "pasien") {
    const feedbackPage = document.createElement("feedback-page");
    app.appendChild(feedbackPage);
  }

  else {
    const notFound = document.createElement("not-found-page");
    app.appendChild(notFound);
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);