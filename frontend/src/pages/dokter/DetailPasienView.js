import ktpimg from "../../assets/images/ktp.jpg"
class DetailPasienView extends HTMLElement {
    set pasien(data) {
      this._pasien = data;
      this.render();
    }
  
    render() {
      if (!this._pasien) {
        this.innerHTML = `<p class="text-danger">Data pasien tidak ditemukan.</p>`;
        return;
      }
  
      this.innerHTML = `
        <section class="container py-5">
        <h2 class="mb-4">Detail Pasien</h2>
        
        <div class="card shadow-sm">
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
                  <img class="ktp-img" src="${ktpimg}" alt="KTP" />
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
          <div class="d-grid gap-2 col-4 ms-auto mt-3">
            <a href="#/dokter" class="btn btn-primary mt-3">Selesai</a>
          </div>

          
        </div>
        </div>
        </section>
      `;
    }
  }
  
  if (!customElements.get('detail-pasien-view')) {
    customElements.define('detail-pasien-view', DetailPasienView);
  }