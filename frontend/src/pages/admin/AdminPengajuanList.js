class AdminPengajuanList extends HTMLElement {
    set dataPasien(value) {
      this._dataPasien = value;
      this.render();
    }
  
    connectedCallback() {
      this.fetchAntrian();
    }
  
    async fetchAntrian() {
      try {
        const res = await fetch('http://localhost:5000/antrian', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Gagal mengambil data antrian');
        const data = await res.json();
        // Pisahkan antrian aktif dan ditolak
        this.antrianAktif = data.filter(a => a.status !== 'ditolak');
        this.antrianDitolak = data.filter(a => a.status === 'ditolak');
        this.render();
      } catch (err) {
        this.innerHTML = `<p class="text-center text-danger">Gagal memuat data antrian</p>`;
      }
    }
  
    render() {
      if (!this.antrianAktif || !this.antrianDitolak) {
        this.innerHTML = `<p class="text-center">Loading...</p>`;
        return;
      }
  
      this.innerHTML = `
        <section class="pasien-container container-xl py-5">
          <h1 class="text-center mb-4">Menunggu Persetujuan</h1>
          <div class="card shadow-sm mb-5">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="pasienTable">
                  <thead class="table-secondary">
                    <tr>
                      <th>No</th>
                      <th>Nama Pasien</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.antrianAktif.map((antrian, index) => `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${antrian.user ? antrian.user.name : '-'}</td>
                        <td>
                          <div class="d-flex justify-content-center align-items-center">
                            <a href="#/detailpengajuan/${antrian.id}" class="text-primary text-decoration-none me-5">Detail</a>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <h2 class="text-center mb-4">Riwayat Ditolak</h2>
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table" id="riwayatDitolakTable">
                  <thead class="table-secondary">
                    <tr>
                      <th>No</th>
                      <th>Nama Pasien</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.antrianDitolak.map((antrian, index) => `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${antrian.user ? antrian.user.name : '-'}</td>
                        <td>
                          <div class="d-flex justify-content-center align-items-center">
                            <a href="#/detailpengajuan/${antrian.id}" class="text-primary text-decoration-none me-5">Detail</a>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      `;
    }
  }
  
  if (!customElements.get('admin-pengajuan-list')) {
    customElements.define('admin-pengajuan-list', AdminPengajuanList);
  }
