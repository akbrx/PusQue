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
    
  
  function router() {
      const app = document.getElementById('app');
      const hash = window.location.hash;
    
      app.innerHTML = '';
    
      if (hash === '' || hash === '#/' || hash === '#/home') {
        // Saat pertama kali dibuka atau ke halaman home
        return; // Jangan tampilkan apapun dulu selain navbar
      }
    
      if (hash.startsWith('#/detailpasien/')) {
        const id = parseInt(hash.split('/')[2]);
        const pasien = dataPasienDummy.find(p => p.id === id);
    
        const detailView = document.createElement('detail-pasien-view');
        detailView.pasien = pasien;
    
        app.appendChild(detailView);
    
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
    
        const detailPengajuan = document.createElement('admin-detail-pengajuan');
        detailPengajuan.pasien = pasien;
    
        app.appendChild(detailPengajuan);
      } else if (hash === '#/beranda') {
          const beranda = document.createElement('admin-beranda');
          app.innerHTML = '';
          app.appendChild(beranda);
      } else {
          app.innerHTML = ''
      }
    }
    
    
    
  
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  