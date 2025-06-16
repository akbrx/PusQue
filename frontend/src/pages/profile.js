// profile.js
import ktpimg from "../assets/images/ktp.jpg"
import { authFetch } from "../fatchauth.js"; // IMPORT authFetch

class ProfileView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        // Fetch data user yang sedang login
        let user = {};
        try {
            // Ganti fetch native dengan authFetch
            // PERBAIKI URL ENDPOINT DI SINI!
            const res = await authFetch('https://backend-pusque-production.up.railway.app/user/me');
            
            // Periksa apakah respons OK sebelum mencoba parsing JSON
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Respons non-JSON atau kosong.' }));
                throw new Error(errorData.message || `Gagal mengambil data user: ${res.status} ${res.statusText}`);
            }
            
            user = await res.json();
            console.log("[PROFILE_VIEW] Data user berhasil diambil:", user); // Log untuk debugging
        } catch (err) {
            user = { name: '-', nik: '-', tanggalLahir: '-', domisili: '-', fotoKtp: '' };
            console.error("[PROFILE_VIEW] Error mengambil data user:", err);
            // Tambahkan logika untuk mengarahkan ulang jika token tidak valid
            if (err.message.includes("Authentikasi diperlukan") || err.message.includes("refresh token")) {
                alert("Sesi Anda telah berakhir atau token tidak valid. Silakan login kembali.");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userRole');
                window.location.hash = "#/login"; // Arahkan ke halaman login
            }
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card-profile {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 2rem;
                    max-width: 900px;
                    width: 100%;
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 40px;
                }
                .left-profile {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .left-profile img.profile {
                    width: 120px;
                    height: 120px;
                    border-radius: 10px;
                    background: #e0e0e0;
                }
                .edit-btn {
                    margin-top: 1rem;
                    padding: 5px 20px;
                    background: #2979ff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .right-profile {
                    flex: 1;
                    padding: 30px;
                }
                .right-profile .nama {
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                .right-profile .label {
                    font-weight: 500;
                }
                .info-line {
                    margin: 0.5rem 0;
                    display: flex;
                    justify-content: space-between; /* Perbaikan typo: space-beetwen menjadi space-between */
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                .info-line span {
                    display: inline-block;
                    width: 50%;
                    flex-shrink: 0;
                }
                .info-line p {
                    display: inline-block;
                    flex-shrink: 0;
                    margin: 0;
                }
                hr {
                    border: none;
                    border-top: 1px solid #ddd;
                    margin: 1rem 0;
                }
                .ktp-img {
                    width: 50%;
                    border-radius: 6px;
                }
                @media (max-width: 500px) {
                    .card-profile {
                        flex-direction: column;
                        box-shadow: none;

                    }
                    .info-line {
                        display: flex;
                        justify-content: space-between; /* Perbaikan typo: space-beetwen menjadi space-between */
                    }
                    
                    .info-line span.label {
                        width : 40%
                    }
                    .info-line p {
                        min-width: 120px;
                    }
                }
                
            </style>
            <div class="card-profile">
                <div class="left-profile">
                    <img class="profile" src="https://img.icons8.com/ios-filled/100/user.png" alt="profile" />
                    <button class="edit-btn">Edit</button>
                </div>
                <div class="right-profile">
                    <div class="info-line-nama">
                        <span class="label">Nama :</span> 
                        <h3 class="nama">${user.name || '-'}</h3>
                    </div>
                    <hr />
                    <div class="info-line">
                        <span class="label">NIK </span> 
                        <p>: ${user.nik || '-'}</p>
                    </div>
                    <div class="info-line">
                        <span class="label">Tanggal Lahir </span> 
                        <p>: ${user.tanggalLahir || '-'}</p>
                    </div>
                    <div class="info-line">
                        <span class="label">Domisili</span> 
                        <p>: ${user.domisili || '-'}</p>
                    </div>
                    <div class="info-line">
                        <span class="label">KTP</span>
                        <img class="ktp-img" src="${user.fotoKtp ? `https://backend-pusque-production.up.railway.app/uploads/ktp/${user.fotoKtp}` : ktpimg}" alt="KTP" /> <!-- Perbaiki URL backend untuk uploads -->
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('profile-view', ProfileView);
