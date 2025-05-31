import imgpuskes from "../assets/images/download.jpg";
class AntrianPuskesmas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        .container-antri {
          font-family: Arial, sans-serif;
          padding: 1rem;
          max-width: 1024px;
          margin: auto;
        }

        .alert {
          background: #fff3f3;
          border: 1px solid red;
          color: red;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .alert::before {
          content: '⚠️';
        }

        .main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .main img {
          width: 100%;
          border-radius: 10px;
        }

        .antrian-box {
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
        }

        .antrian-box h3 {
          margin: 0 0 0.5rem;
        }

        .antrian-box .kode {
          width: 50%;
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem auto;
          padding: 1.5rem;
          border: #407BFF solid;
        }

        .box-estimasi {
          display: flex;
          justify-content: space-around;
        }

        .label {
          font-size: 0.9rem;
          color: #555;
        }

        .kode-poli {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .poli-box {
          background: #337eff;
          color: white;
          text-align: center;
          padding: 1.5rem;
          border-radius: 10px;
          font-weight: bold;
          font-size: 1.4rem;
        }

        .poli-box span {
          display: block;
          font-size: 1.4rem;
          margin-top: 0.3rem;
        }

        @media (max-width: 768px) {
          .main {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="container-antri">
        <div class="alert">
          Waktu yang tercantum bersifat estimasi dan dapat berubah sewaktu-waktu, baik lebih awal maupun lebih lambat, tergantung situasi dan kondisi yang terjadi.
        </div>

        <div class="main">
          <img src="${imgpuskes}" alt="Puskesmas">
          <div class="antrian-box">
            <h3>Antrian Anda :</h3>
            <div class="kode">A-507</div>
            <div class="box-estimasi">
              <div class="label">
                <p>Estimasi Masuk</p>
                <h3>07:55</h3>
              </div>
              <div class="label">
                <p>Estimasi Keluar</p>
                <h3>08:08</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="kode-poli">
          <div class="poli">
            <h3>Poli Umum :</h3>
            <div class="poli-box">A-507</div>
          </div>
          <div class="poli">
            <h3>Poli Gigi :</h3>
            <div class="poli-box">B-507</div>
          </div>
          <div class="poli">
            <h3>Poli Anak :</h3>
            <div class="poli-box">C-507</div>
          </div>
          <div class="poli">
            <h3>Poli Kandungan :</h3>
            <div class="poli-box">D-507</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('antrian-puskesmas', AntrianPuskesmas);
