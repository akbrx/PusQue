import ktpimg from "../../assets/images/ktp.jpg";

class AdminDetailPengajuan extends HTMLElement {
  set pasien(data) {
    this._pasien = data;
    this.render();
  }

  connectedCallback() {
    const id = window.location.hash.split('/')[2];
    this.fetchDetailAntrian(id);
  }

  async fetchDetailAntrian(id) {
    try {
      // Ambil semua antrian
      const resAll = await fetch('http://localhost:5000/antrian', {
        credentials: 'include'
      });
      const allData = await resAll.json();

      // Filter hanya antrian aktif (bukan ditolak)
      const aktifData = allData.filter(a => a.status !== 'ditolak');

      // Urutkan berdasarkan createdAt
      aktifData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      // Cari index antrian yang sedang dibuka di antrian aktif
      const idx = aktifData.findIndex(a => a.id == id);

      // Ambil detail antrian yang sedang dibuka
      const res = await fetch(`http://localhost:5000/antrian/${id}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Gagal mengambil detail antrian');
      const data = await res.json();

      this.pasien = {
        nama: data.user?.name || '-',
        antrian: idx >= 0 ? idx + 1 : '-', // No antrian dinamis dari antrian aktif
        tglLahir: data.user?.tanggalLahir || '-',
        nik: data.user?.nik || '-',
        fotoKtp: data.user?.fotoKtp || '',
        poli: data.poli || '-',
        keluhan: data.keluhan ? data.keluhan.split(',').map(k => k.trim()) : []
      };
    } catch (err) {
      this.innerHTML = `<p class="text-danger">Gagal memuat detail antrian</p>`;
    }
  }

  render() {
    console.log("Data pasien di render:", this._pasien);
    if (!this._pasien) {
      this.innerHTML = `<p class="text-danger">Data pasien tidak ditemukan.</p>`;
      return;
    }

    const fotoKtpSrc = this._pasien.fotoKtp
      ? `http://localhost:5000/uploads/ktp/${this._pasien.fotoKtp}`
      : ktpimg;

    this.innerHTML = `
      <section class="container py-5">
        <h2 class="mb-4">Detail Pasien</h2>
        <div class="card shadow-sm mx-4 mt-4">
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row" style="width: 200px;">Nama</th>
                  <td style="padding-left: 35rem;">${this._pasien.nama}</td>
                </tr>
                <tr>
                  <th scope="row">No Antrian</th>
                  <td style="padding-left: 35rem;">${this._pasien.antrian}</td>
                </tr>
                <tr>
                  <th scope="row">Tanggal Lahir</th>
                  <td style="padding-left: 35rem;">${this._pasien.tglLahir}</td>
                </tr>
                <tr>
                  <th scope="row">NIK</th>
                  <td style="padding-left: 35rem;">${this._pasien.nik}</td>
                </tr>
                <tr>
                  <th scope="row">Foto KTP</th>
                  <td style="padding-left: 35rem;">
                    <img class="ktp-img" src="${fotoKtpSrc}" alt="KTP" style="max-width:200px;"/>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Poli</th>
                  <td style="padding-left: 35rem;">${this._pasien.poli}</td>
                </tr>
                <tr>
                  <th scope="row">Keluhan</th>
                  <td style="padding-left: 35rem;">
                    <ul class="mb-0">
                      ${this._pasien.keluhan.map(k => `<li>${k}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row mt-3 justify-content-end">
              <div class="col-4">
                <button id="btn-tolak" class="btn w-100" style="background-color: #FF0000; color: white;">Tolak</button>
              </div>
              <div class="col-4">
                <button id="btn-acc" class="btn btn-primary w-100">Setujui</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Event listener tombol
    this.querySelector('#btn-tolak')?.addEventListener('click', () => this.tolakAntrian());
    this.querySelector('#btn-acc')?.addEventListener('click', () => this.accAntrian());
  }

  async tolakAntrian() {
    if (!confirm('Yakin ingin menolak antrian ini?')) return;
    try {
      const id = window.location.hash.split('/')[2];
      const res = await fetch(`http://localhost:5000/antrian/${id}/tolak`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        alert('Antrian berhasil ditolak.');
        window.location.hash = '#/pengajuan';
      } else {
        alert(data.message || 'Gagal menolak antrian');
      }
    } catch (err) {
      alert('Terjadi error saat menolak antrian');
    }
  }

  async accAntrian() {
    if (!confirm('Yakin ingin menyetujui antrian ini?')) return;
    try {
      const id = window.location.hash.split('/')[2];
      const res = await fetch(`http://localhost:5000/antrian/${id}/acc`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        alert('Antrian berhasil disetujui.');
        window.location.hash = '#/pengajuan';
      } else {
        alert(data.message || 'Gagal menyetujui antrian');
      }
    } catch (err) {
      alert('Terjadi error saat menyetujui antrian');
    }
  }
}

if (!customElements.get('admin-detail-pengajuan')) {
  customElements.define('admin-detail-pengajuan', AdminDetailPengajuan);
}