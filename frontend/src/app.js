import "./components/navbar.js";
import "./components/navbar_a.js";
import "./pages/homePage.js";
import "./components/feedBack.js";
import "./pages/antrianPage.js";
import "./pages/formPendaftaranAntrian.js";
import "./pages/profile.js";
import "./pages/chatBot.js";
import './pages/PasienListView.js';
import './pages/DetailPasienView.js';
import './pages/AdminPengajuanList.js';
import './pages/AdminDetailPengajuan.js';
import './pages/AdminBeranda.js';
import { renderLoginForm } from './pages/auth/login.js';
import { renderRegisterForm } from './pages/auth/register.js';

const dataPasienDummy = [
  {
    id: 1,
    antrian: 'A001',
    nama: 'Ahmad Fauzi',
    tglLahir: '23 Juni 1998',
    nik: '3174012309980001',
    fotoKtp: '/image/ktp.jpg',
    poli: 'Umum',
    keluhan: ['Batuk', 'Muntah']
  },
  {
    id: 2,
    antrian: 'A002',
    nama: 'Rina Kartika',
    tglLahir: '14 April 1995',
    nik: '3174021404950002',
    fotoKtp: '/image/ktp.jpg',
    poli: 'Gigi',
    keluhan: ['Sakit gigi']
  },
  {
    id: 3,
    antrian: 'A003',
    nama: 'Bagas Saputra',
    tglLahir: '10 Oktober 1990',
    nik: '3174031010900003',
    fotoKtp: '/image/ktp.jpg',
    poli: 'Anak',
    keluhan: ['Demam', 'Pilek']
  }
];

window.PasienPerBulan = [
  { bulan: "Januari", jumlah: 120 },
  { bulan: "Februari", jumlah: 95 },
  { bulan: "Maret", jumlah: 130 },
  { bulan: "April", jumlah: 110 },
  { bulan: "Mei", jumlah: 140 },
  { bulan: "Juni", jumlah: 100 },
  { bulan: "Juli", jumlah: 150 },
  { bulan: "Agustus", jumlah: 125 },
  { bulan: "September", jumlah: 135 },
  { bulan: "Oktober", jumlah: 90 },
  { bulan: "November", jumlah: 115 },
  { bulan: "Desember", jumlah: 160 }
];

function isLoggedIn() {
  // Cek token di localStorage, sesuaikan dengan nama token yang kamu simpan setelah login
  return !!localStorage.getItem('accessToken');
}

function router() {
  const app = document.getElementById('app');
  const hash = window.location.hash;

  app.innerHTML = ''; // Bersihkan konten utama terlebih dahulu

  // Jika belum login, selalu tampilkan form login
  if (!isLoggedIn() && hash !== "#/login") {
    window.location.hash = "#/login";
    return;
  }

  // Render halaman login
  if (hash === "#/login") {
    renderLoginForm(() => {
      window.location.hash = "#/";
    });
    return;

  } else if (hash === "#/register") {
    renderRegisterForm(() => {
      window.location.hash = "#/login";
    });
    return;
  }

  // Jika sudah login, render halaman sesuai hash
  if (hash === "" || hash === "#/" || hash === "#/home") {
    const home = document.createElement("pusque-page");
    app.appendChild(home);
  } else if (hash === "#/antrian") {
    const antrian = document.createElement("antrian-puskesmas");
    app.appendChild(antrian);
  } else if (hash === "#/daftar") {
    const form = document.createElement("daftar-antrian-form");
    app.appendChild(form);
  } else if (hash === "#/profile") {
    const profile = document.createElement("profile-view");
    app.appendChild(profile);
  } else if (hash === "#/chatbot") {
    const chat = document.createElement("chat-bot");
    app.appendChild(chat);
  } else if (hash.startsWith('#/detailpasien/')) {
    const id = parseInt(hash.split('/')[2]);
    const pasien = dataPasienDummy.find(p => p.id === id);

    if (pasien) {
      const detailView = document.createElement('detail-pasien-view');
      detailView.pasien = pasien;
      app.appendChild(detailView);
    } else {
      app.innerHTML = "<h2>Pasien tidak ditemukan</h2>";
    }

  } else if (hash === '#/dokter') {
    const listView = document.createElement('pasien-list-view');
    listView.dataPasien = dataPasienDummy;
    app.appendChild(listView);
  } else if (hash === '#/pengajuan') {
    const adminList = document.createElement('admin-pengajuan-list');
    adminList.dataPasien = dataPasienDummy;
    app.appendChild(adminList);
  } else if (hash.startsWith('#/detailpengajuan/')) {
    const id = parseInt(hash.split('/')[2]);
    const pasien = dataPasienDummy.find(p => p.id === id);

    if (pasien) {
      const detailPengajuan = document.createElement('admin-detail-pengajuan');
      detailPengajuan.pasien = pasien;
      app.appendChild(detailPengajuan);
    } else {
      app.innerHTML = "<h2>Pengajuan tidak ditemukan</h2>";
    }

  } else if (hash === '#/beranda') {
    const beranda = document.createElement('admin-beranda');
    app.appendChild(beranda);
  } else {
    app.innerHTML = "<h2>404 - Halaman tidak ditemukan</h2>";
  }
}

function logout() {
  localStorage.removeItem('accessToken');
  window.location.hash = "#/login";
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
