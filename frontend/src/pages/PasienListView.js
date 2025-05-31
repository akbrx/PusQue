class PasienListView extends HTMLElement {
    set dataPasien(value) {
      this._dataPasien = value;
      this.render();
    }
  
    render() {
      if (!this._dataPasien) {
        this.innerHTML = `<p class="text-center">Loading...</p>`;
        return;
      }
  
      this.innerHTML = `
        <section class="pasien-container container-xl py-5">
          <h1 class="text-center mb-4">Daftar Pasien</h1>
  
          <!-- Filter Dropdown -->
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-end mb-3">
                <label for="filterSelect" class="me-2">Filter :</label>
                <select id="filterSelect" class="form-select w-auto">
                  <option value="antrian">Antrian</option>
                </select>
              </div>
  
              <!-- Tabel -->
              <div class="table-responsive">
                <table class="table" id="pasienTable">
                  <thead class="table-secondary">
                    <tr>
                      <th>No</th>
                      <th>Nomor Antrian</th>
                      <th>Nama Pasien</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this._dataPasien.map((pasien, index) => `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${pasien.antrian}</td>
                        <td>${pasien.nama}</td>
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
    }
  }
  
  if (!customElements.get('pasien-list-view')) {
    customElements.define('pasien-list-view', PasienListView);
  }
  