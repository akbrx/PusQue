// antrianPage.js
import imgpuskes from "../../assets/images/download.jpg";
import { authFetch } from "../../fatchauth.js"; // Pastikan path ini benar!

class AntrianPuskesmas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._antrian = null;
        this._semuaAntrian = null; // Inisialisasi properti ini
        this._fetchError = false; // Flag untuk status error fetch
    }

    async connectedCallback() {
        try {
            // Gunakan authFetch untuk semua permintaan yang memerlukan otentikasi
            const [resUser, resAll] = await Promise.all([
                authFetch('https://serverpusque-production.up.railway.app/antrian/user'),
                authFetch('https://serverpusque-production.up.railway.app/antrian')
            ]);

            // Pastikan respons OK sebelum parsing JSON
            if (!resUser.ok) {
                const errorData = await resUser.json().catch(() => ({ message: 'Gagal memuat antrian user: Respons server tidak OK.' }));
                throw new Error(errorData.message || 'Gagal memuat antrian user.');
            }
            if (!resAll.ok) {
                const errorData = await resAll.json().catch(() => ({ message: 'Gagal memuat semua antrian: Respons server tidak OK.' }));
                throw new Error(errorData.message || 'Gagal memuat semua antrian.');
            }

            this._antrian = await resUser.json();
            this._semuaAntrian = await resAll.json();
            this._fetchError = false; // Reset error flag jika berhasil
        } catch (err) {
            console.error("Error fetching antrian data:", err);
            this._fetchError = true; // Set error flag jika ada error
            // Tambahkan logika untuk mengarahkan ulang jika token tidak valid
            if (err.message.includes("Authentikasi diperlukan") || err.message.includes("refresh token")) {
                alert("Sesi Anda telah berakhir atau token tidak valid. Silakan login kembali.");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userRole');
                window.location.hash = "#/login"; // Arahkan ke halaman login
            }
        } finally {
            this.render(); // Selalu render, baik berhasil atau gagal, untuk menampilkan UI yang sesuai
        }
    }

    formatTimeFromMinutes(minutes) {
        const baseHour = 8;
        const totalMinutes = baseHour * 60 + minutes;
        const jam = Math.floor(totalMinutes / 60);
        const menit = Math.floor(totalMinutes % 60);
        return `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}`;
    }

    hitungEstimasi(antrianUser) {
        if (!antrianUser || !this._semuaAntrian || !this._semuaAntrian.length) return { masuk: '-', keluar: '-' };

        const poli = antrianUser.poli;
        const antrianPoli = this._semuaAntrian
            .filter(a => a.poli === poli && a.status === 'dalam antrian')
            .sort((a, b) => a.queue_number - b.queue_number);

        let estimasiWaktu = 0; // menit, mulai dari jam 08.00
        let waktuMasuk = 0;
        let waktuKeluar = 0;

        for (const pasien of antrianPoli) {
            const masuk = estimasiWaktu + (pasien.estimasi_masuk || 0);
            const keluar = masuk + (pasien.durasi_periksa || 0);

            if (pasien.id === antrianUser.id) {
                waktuMasuk = masuk;
                waktuKeluar = keluar;
                break;
            }

            estimasiWaktu = keluar;
        }

        return {
            masuk: this.formatTimeFromMinutes(waktuMasuk),
            keluar: this.formatTimeFromMinutes(waktuKeluar),
        };
    }

    getAntrianPertamaPerPoli(poli) {
        const kodeAwal = {
            umum: 'A',
            gigi: 'B',
            anak: 'C',
            kandungan: 'D'
        };

        const poliQueue = this._semuaAntrian
            .filter(a => a.poli === poli && a.status === 'dalam antrian')
            .sort((a, b) => a.queue_number - b.queue_number);

        const pertama = poliQueue[0];
        return pertama ? `${kodeAwal[poli]}-${pertama.queue_number}` : '-';
    }

    getKodeAntrianPasienSaatIni() {
        const kodeAwal = {
            umum: 'A',
            gigi: 'B',
            anak: 'C',
            kandungan: 'D'
        };

        if (!this._antrian || !this._antrian.poli || !this._antrian.queue_number) return '-';

        const huruf = kodeAwal[this._antrian.poli] || '?';
        return `${huruf}-${this._antrian.queue_number}`;
    }

    getJumlahAntrianPerPoli(poli) {
        if (!this._semuaAntrian) return 0;
        return this._semuaAntrian.filter(a => a.poli === poli && a.status === 'dalam antrian').length;
    }

    render() {
        let nomorAntrian = '-';
        let estimasi = { masuk: '-', keluar: '-' };

        if (this._antrian && this._antrian.queue_number) {
            nomorAntrian = `${this._antrian.queue_number}`;
            estimasi = this.hitungEstimasi(this._antrian);
        }

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

                .back-button {
                    display: inline-block;
                    color: #2979ff;
                    text-decoration: none;
                    padding: 1rem;
                    font-size: 1rem;
                    font-weight: bold;
                }

                .back-button:hover {
                    text-decoration: underline;
                    color: #004ecb;
                }
            </style>
            <div class="container-antri">
                <a class="back-button" href="#/">&#8592; Kembali</a>
                <div class="alert">
                    Waktu yang tercantum bersifat estimasi dan dapat berubah sewaktu-waktu, baik lebih awal maupun lebih lambat, tergantung situasi dan kondisi yang terjadi.
                </div>

                <div class="main">
                    <img src="${imgpuskes}" alt="Puskesmas">
                    <div class="antrian-box">
                        <h3>Antrian Anda :</h3>
                        ${
                            this._fetchError
                                ? `<div class="kode text-danger">Gagal mengambil data antrian. Pastikan Anda sudah login atau coba lagi nanti.</div>`
                                : (this._antrian && this._antrian.queue_number)
                                  ? `<div class="kode">${this.getKodeAntrianPasienSaatIni()}</div>
                                     <div class="box-estimasi">
                                         <div class="label">
                                             <p>Estimasi Masuk</p>
                                             <h2>${estimasi.masuk}</h2>
                                         </div>
                                         <div class="label">
                                             <p>Estimasi Keluar</p>
                                             <h2>${estimasi.keluar}</h2>
                                         </div>
                                     </div>`
                                  : `<div class="kode text-secondary">Anda belum memiliki antrian aktif.</div>`
                        }
                    </div>
                </div>

                <div class="kode-poli">
                    <div class="poli">
                        <h3>Poli Umum :</h3>
                        <div class="poli-box">
                            ${this.getJumlahAntrianPerPoli('umum')} pasien
                        </div>
                    </div>
                    <div class="poli">
                        <h3>Poli Gigi :</h3>
                        <div class="poli-box">
                            ${this.getJumlahAntrianPerPoli('gigi')} pasien
                        </div>
                    </div>
                    <div class="poli">
                        <h3>Poli Anak :</h3>
                        <div class="poli-box">
                            ${this.getJumlahAntrianPerPoli('anak')} pasien
                        </div>
                    </div>
                    <div class="poli">
                        <h3>Poli Kandungan :</h3>
                        <div class="poli-box">
                            ${this.getJumlahAntrianPerPoli('kandungan')} pasien
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('antrian-puskesmas', AntrianPuskesmas);
