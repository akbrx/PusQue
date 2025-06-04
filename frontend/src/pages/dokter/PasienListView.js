class PasienListView extends HTMLElement {
  set dataPasien(value) {
    // Simpan semua data untuk kebutuhan filter
    this._allPasien = value.filter(p => p.status === 'dalam antrian');
    // Default: tampilkan semua poli
    this._selectedPoli = this._selectedPoli || 'semua';
    this.applyFilter();
  }

  applyFilter() {
    let filtered = this._allPasien;
    if (this._selectedPoli && this._selectedPoli !== 'semua') {
      filtered = filtered.filter(p => p.poli === this._selectedPoli);
    }
    // Urutkan berdasarkan createdAt
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    this._dataPasien = filtered.map((p, idx) => ({
      id: p.id,
      antrian: idx + 1,
      nama: p.user?.name || '-',
      poli: p.poli,
      status: p.status
    }));
    this.render();
  }

  connectedCallback() {
    // Agar filter tetap jalan saat komponen di-mount ulang
    this._selectedPoli = this._selectedPoli || 'semua';
  }

  render() {
    if (!this._dataPasien) {
      this.innerHTML = `<p class="text-center">Loading...</p>`;
      return;
    }

    // Dropdown filter poli
    this.innerHTML = `
      <section class="pasien-container container-xl py-5">
        <h1 class="text-center mb-4">Daftar Pasien</h1>
        <div class="mb-3">
          <label for="filter-poli" class="form-label">Filter Poli:</label>
          <select id="filter-poli" class="form-select" style="max-width: 300px;">
            <option value="semua"${this._selectedPoli === 'semua' ? ' selected' : ''}>Semua</option>
            <option value="umum"${this._selectedPoli === 'umum' ? ' selected' : ''}>Umum</option>
            <option value="gigi"${this._selectedPoli === 'gigi' ? ' selected' : ''}>Gigi</option>
            <option value="anak"${this._selectedPoli === 'anak' ? ' selected' : ''}>Anak</option>
          </select>
        </div>
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table" id="pasienTable">
                <thead class="table-secondary">
                  <tr>
                    <th>No</th>
                    <th>Nomor Antrian</th>
                    <th>Nama Pasien</th>
                    <th>Poli</th>
                    <th class="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._dataPasien.map((pasien, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${pasien.antrian}</td>
                      <td>${pasien.nama}</td>
                      <td>${pasien.poli}</td>
                      <td>
                        <div class="d-flex justify-content-center align-items-center">
                          <a href="#/detailpasien/${pasien.id}" class="text-primary text-decoration-none me-5">Detail</a>
                          <span class="text-danger me-5">Belum Datang</span>
                          <span class="text-success">Proses</span>
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

    // Event listener untuk filter poli
    this.querySelector('#filter-poli').addEventListener('change', (e) => {
      this._selectedPoli = e.target.value;
      this.applyFilter();
    });
  }
}

if (!customElements.get('pasien-list-view')) {
  customElements.define('pasien-list-view', PasienListView);
}
