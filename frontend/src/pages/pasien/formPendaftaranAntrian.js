// formPendaftaranAntrian.js
import { authFetch } from "../../fatchauth.js"; // Import authFetch

class DaftarAntrianForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelectorAll('input[name="poli"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateCheckboxes());
        });

        // Pastikan updateCheckboxes dipanggil pertama kali untuk inisialisasi
        this.updateCheckboxes();

        // Tambahkan event listener submit
        this.shadowRoot.querySelector('form').addEventListener('submit', async (e) => {
            e.preventDefault();

            // Ambil data keluhan (bisa lebih dari satu)
            const keluhanArr = Array.from(this.shadowRoot.querySelectorAll('input[name="keluhan"]:checked')).map(cb => cb.value);
            const keluhan = keluhanArr.join(', ');

            // Ambil poli yang dipilih
            const poli = this.shadowRoot.querySelector('input[name="poli"]:checked').value;

            // Validasi sederhana: pastikan keluhan dipilih
            if (keluhanArr.length === 0) {
                alert('Silakan pilih setidaknya satu keluhan.');
                return;
            }

            // Kirim ke backend menggunakan authFetch
            try {
                // Ganti fetch native dengan authFetch dan gunakan URL backend yang benar
                const res = await authFetch('https://backend-pusque-production.up.railway.app/antrian', {
                    method: 'POST',
                    // authFetch sudah menangani headers dan credentials, jadi tidak perlu disetel manual di sini
                    body: JSON.stringify({ keluhan, poli })
                });

                const data = await res.json();

                if (res.ok) {
                    alert('Antrian berhasil didaftarkan!');
                    // Reset form setelah sukses
                    this.shadowRoot.querySelector('form').reset();
                    this.updateCheckboxes(); // Perbarui checkbox setelah reset
                    window.location.hash = "#/antrian"; // Redirect ke halaman antrian
                } else {
                    alert(data.message || 'Gagal mendaftar antrian');
                    console.error("Gagal mendaftar antrian:", data);
                }
            } catch (err) {
                console.error("Error saat mendaftar antrian:", err);
                alert('Terjadi error koneksi atau otentikasi. Silakan login kembali.');
                // Redirect ke login jika error otentikasi
                if (err.message.includes("Authentikasi diperlukan") || err.message.includes("refresh token")) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userRole');
                    window.location.hash = "#/login";
                }
            }
        });
    }

    updateCheckboxes() {
        const keluhanContainer = this.shadowRoot.querySelector('#keluhan-container');
        const selectedPoliRadio = this.shadowRoot.querySelector('input[name="poli"]:checked');
        
        // Pastikan ada radio button yang terpilih sebelum mencoba mengakses .value
        const selectedPoli = selectedPoliRadio ? selectedPoliRadio.value : 'umum'; // Default ke umum jika tidak ada yang terpilih

        const keluhanOptions = {
            umum: ['Sakit Kepala', 'Demam', 'Batuk', 'Pilek', 'Lemas', 'Mual', 'Sakit Perut', 'Pusing'],
            gigi: ['Sakit Gigi', 'Gusi Bengkak', 'Tambal Gigi', 'Cabut Gigi', 'Kontrol', 'Pembersihan'],
            anak: ['Imunisasi', 'Demam Anak', 'Batuk Anak', 'Tumbuh Gigi', 'Kontrol Rutin'],
            kandungan: ['Kontrol kehamilan', 'Sakit Perut', 'Pendarahan', 'Konsultasi KB', 'Konsultasi Kehamilan']
        };

        keluhanContainer.innerHTML = keluhanOptions[selectedPoli]
            .map(keluhan => `
                <label>
                    <input type="checkbox" name="keluhan" value="${keluhan}" /> ${keluhan}
                </label>
            `)
            .join('');
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .container-daftar {
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 2rem;
                    border-radius: 12px;
                    background: white;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    font-family: sans-serif;
                }
                h2 {
                    margin-bottom: 1rem;
                }
                input[type="date"] {
                    width: 100%;
                    padding: 0.5rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .poli-options label {
                    display: block;
                    margin: 0.5rem 0;
                }
                strong {
                    color: #407BFF;
                }
                .grid-checkboxes {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 0.5rem;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .grid-checkboxes label {
                    background: #f8f8f8;
                    padding: 0.5rem;
                    border-radius: 6px;
                }
                button {
                    width: 100%;
                    padding: 0.75rem;
                    background: #1d4ed8;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
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
            <form class="container-daftar">
                <a class="back-button" href="#/">&#8592; Kembali</a>
                <h2>Daftar Antrian</h2>
                <input type="date" name="tanggal" />

                <div class="poli-options">
                    <strong>Pilih Poli:</strong>
                    <label><input type="radio" name="poli" value="umum" checked /> Poli Umum</label>
                    <label><input type="radio" name="poli" value="gigi" /> Poli Gigi</label>
                    <label><input type="radio" name="poli" value="anak" /> Poli Anak</label>
                    <label><input type="radio" name="poli" value="kandungan" /> Poli Kandungan</label>
                </div>

                <div>
                    <strong>Keluhan:</strong>
                    <div id="keluhan-container" class="grid-checkboxes"></div>
                </div>

                <button type="submit">Daftar</button>
            </form>
        `;
        this.updateCheckboxes(); // Panggil ini setelah render untuk mengisi checkbox awal
    }
}

customElements.define('daftar-antrian-form', DaftarAntrianForm);
