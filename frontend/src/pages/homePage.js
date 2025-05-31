import heroImg from "../assets/images/bennerHome.png";
import bennerImg from "../assets/images/benner.jpg";
class PusquePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .container {
          padding: 30px;
          margin-inline: 0;  
        }

        .hero {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        .hero-text {
          margin: 20px;
        }

        .hero-text h2 {
          font-size: 30px;
          margin-bottom: 30px;
          border-bottom: #000000 solid 2px;
          width: 100px
        }
        
        .hero-text p {
          margin-bottom: 30px;
          font-size: 20px;
          text-align: justify;
        }

        .hero-text button {
          background: #007bff;
          color: white;
          font-size: 20px;
          padding: 30px 30px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .hero-img {
          width: 100%;
          max-width: 600px;
        }

        .feedback {
          text-align: center;
          margin-top: 30px;
        }

        .feedback h3 {
          margin-bottom: 20px;
        }

        .jadwal {
          padding: 20px;
        }

        .jadwal h3 {
          text-align: center;
          margin-bottom: 15px;
        }

        .jadwal-grid {
          display: grid;
          gap: 15px;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .container {
            padding: 30px;
            margin-inline: 80px;  
          }
          .jadwal-grid {
            grid-template-columns: repeat(2, 1.3fr);
          }
          .hero-img {
            width: 100%;
            max-width: 600px;
          }
        }

        @media (min-width: 768px) {
          .hero-content {
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
          }

          .hero-text {
            width: 30%;
            min-width: 300px;
          }

          .hero-img {
            width: 55%;
            max-width: 700px;
           
          }

        }


        @media (min-width: 1024px) {
          .jadwal-grid {
            grid-template-columns: repeat(3, 1fr);
          }
            
          .hero-text {
            width: 45%;
            min-width: 300px;
          }

          .hero-img {
            width: 60%;
            max-width: 700px;
          }
        }

        .jadwal-card {
          border: 1px solid #ccc;
          border-radius: 12px;
          overflow: hidden;
          font-family: sans-serif;
        }

        .jadwal-header {
          background-color: #f9f9f9;
          padding: 10px 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
        }

        .jadwal-header img {
          width: 18px;
          height: 18px;
        }

        .jadwal-content {
          padding: 12px;
        }

        .jadwal-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .jadwal-row:first-child {
          font-weight: bold;
        }

        .banner {
          padding: 20px;
          text-align: center;
        }

        .banner img {
          width: 100%;
          max-width: 600px;
          border-radius: 10px;
        }

        .footer {
          background: #007bff;
          color: white;
          text-align: center;
          padding: 10px;
          margin-top: 20px;
        }
      </style>

      <div class="container">
        <section class="hero">
          <div class="hero-content">
            <div class="hero-text">
              <h2>PusQue</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum sit alias tempore aperiam nulla maiores! Quisquam quia rem, doloribus consequuntur fugiat ducimus totam eum praesentium, aliquid beatae id ipsa?Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet deserunt mollitia officiis maiores sequi unde molestias eaque nam laudantium voluptates necessitatibus, delectus eos esse corrupti perspiciatis, ad libero, non minima?</p>
              <button>Daftar Antrean</button>
            </div>
            <img src="${heroImg}" alt="Antrian" class="hero-img" />
          </div>
        </section>

        <div class="feedback">
          <h3>Feedback</h3>
          <feedback-carousel></feedback-carousel>
        </div>
  
        <section class="jadwal">
          <h3>Jadwal</h3>
          <div class="jadwal-grid">
            <div class="jadwal-card">
              <div class="jadwal-header">
                <span>Senin</span>
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="calendar">
              </div>
              <div class="jadwal-content">
                <div class="jadwal-row"><span>Buka & Tutup</span><span>08:00 | 17:00</span></div>
                <div class="jadwal-row"><span>Poli Umum</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Gigi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Anak</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Imunisasi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>IGD</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Kandungan</span><span>Setiap Hari</span></div>
              </div>
            </div>
            <div class="jadwal-card">
              <div class="jadwal-header">
                <span>Senin</span>
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="calendar">
              </div>
              <div class="jadwal-content">
                <div class="jadwal-row"><span>Buka & Tutup</span><span>08:00 | 17:00</span></div>
                <div class="jadwal-row"><span>Poli Umum</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Gigi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Anak</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Imunisasi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>IGD</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Kandungan</span><span>Setiap Hari</span></div>
              </div>
            </div>
            <div class="jadwal-card">
              <div class="jadwal-header">
                <span>Senin</span>
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="calendar">
              </div>
              <div class="jadwal-content">
                <div class="jadwal-row"><span>Buka & Tutup</span><span>08:00 | 17:00</span></div>
                <div class="jadwal-row"><span>Poli Umum</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Gigi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Anak</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Imunisasi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>IGD</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Kandungan</span><span>Setiap Hari</span></div>
              </div>
            </div>
            <div class="jadwal-card">
              <div class="jadwal-header">
                <span>Senin</span>
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="calendar">
              </div>
              <div class="jadwal-content">
                <div class="jadwal-row"><span>Buka & Tutup</span><span>08:00 | 17:00</span></div>
                <div class="jadwal-row"><span>Poli Umum</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Gigi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Anak</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Imunisasi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>IGD</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Kandungan</span><span>Setiap Hari</span></div>
              </div>
            </div>
            <div class="jadwal-card">
              <div class="jadwal-header">
                <span>Senin</span>
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="calendar">
              </div>
              <div class="jadwal-content">
                <div class="jadwal-row"><span>Buka & Tutup</span><span>08:00 | 17:00</span></div>
                <div class="jadwal-row"><span>Poli Umum</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Gigi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Anak</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Imunisasi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>IGD</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Kandungan</span><span>Setiap Hari</span></div>
              </div>
            </div>
            <div class="jadwal-card">
              <div class="jadwal-header">
                <span>Senin</span>
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="calendar">
              </div>
              <div class="jadwal-content">
                <div class="jadwal-row"><span>Buka & Tutup</span><span>08:00 | 17:00</span></div>
                <div class="jadwal-row"><span>Poli Umum</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Gigi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Anak</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Imunisasi</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>IGD</span><span>Setiap Hari</span></div>
                <div class="jadwal-row"><span>Poli Kandungan</span><span>Setiap Hari</span></div>
              </div>
            </div>
          </div>
        </section>
  
        <section class="banner">
          <img src="${bennerImg}" alt="Kampanye Kesehatan">
        </section>
      </div>
  
      <footer class="footer">© 2025 PusQue</footer>
    `;
  }
}

customElements.define('pusque-page', PusquePage);
