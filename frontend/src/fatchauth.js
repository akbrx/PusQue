// fatchauth.js

/**
 * Fungsi untuk melakukan fetch request dengan menyertakan token otentikasi dari localStorage.
 * Jika Access Token kadaluarsa (respons 401), fungsi ini akan mencoba me-refresh token
 * dan mengulangi request asli.
 *
 * @param {string} url - URL endpoint API yang akan di-fetch.
 * @param {Object} options - Objek opsi untuk fetch API (seperti method, headers, body).
 * @returns {Promise<Response>} - Promise yang menghasilkan objek Response dari fetch API.
 * @throws {Error} Jika token tidak ada, tidak dapat di-refresh, atau ada masalah jaringan/server.
 */
export async function authFetch(url, options = {}) {
    // 1. Ambil Access Token dari localStorage di awal fungsi.
    // Ini adalah langkah KRITIS untuk memastikan 'accessToken' terdefinisi.
    let accessToken = localStorage.getItem('accessToken');

    // 2. Jika tidak ada Access Token, segera lempar error.
    // Pengguna harus login terlebih dahulu.
    if (!accessToken) {
        console.error("Error (authFetch): Access Token tidak ditemukan di localStorage. Pengguna mungkin belum login.");
        throw new Error("Authentikasi diperlukan. Silakan login kembali.");
    }

    // 3. Siapkan header untuk request awal dengan token yang ada.
    const initialHeaders = {
        ...options.headers, // Pertahankan header yang mungkin sudah ada
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    // Tambahkan credentials 'include' untuk memastikan cookie (refreshToken) dikirim.
    const fetchOptions = {
        ...options,
        headers: initialHeaders,
        credentials: 'include'
    };

    let response = await fetch(url, fetchOptions);

    // 4. Periksa jika Access Token kadaluarsa (respons 401 Unauthorized)
    if (response.status === 401) {
        console.warn("Access Token kadaluarsa atau tidak valid. Mencoba me-refresh token...");

        try {
            // Minta token baru dari backend melalui endpoint refresh token
            const tokenRes = await fetch('https://serverpusque-production.up.railway.app/token', {
                method: 'GET', // Asumsi endpoint refresh token menggunakan GET
                credentials: 'include' // Penting untuk mengirim cookie refreshToken
            });

            if (tokenRes.ok) {
                const tokenData = await tokenRes.json();
                const newAccessToken = tokenData.accessToken;

                if (!newAccessToken) {
                    throw new Error('Refresh token berhasil, tetapi accessToken baru tidak ditemukan.');
                }

                // Simpan Access Token baru ke localStorage
                localStorage.setItem('accessToken', newAccessToken);
                accessToken = newAccessToken; // Perbarui variabel accessToken

                // Opsional: Jika backend juga mengirim role di respons refresh token, simpan juga
                // Misalnya: if (tokenData.role) localStorage.setItem('userRole', tokenData.role);

                console.log("Access Token berhasil di-refresh. Mengulang request asli...");

                // Ulangi request asli dengan Access Token yang baru
                fetchOptions.headers['Authorization'] = `Bearer ${accessToken}`; // Perbarui header
                response = await fetch(url, fetchOptions); // Ulangi fetch
            } else {
                // Jika refresh token gagal (misalnya 403 Forbidden dari backend)
                const errorData = await tokenRes.json().catch(() => ({ message: 'Tidak dapat refresh token.' }));
                console.error("Gagal me-refresh token:", errorData);
                // Penting: Buang token yang usang dan lempar error
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userRole');
                throw new Error(errorData.message || 'Tidak dapat me-refresh token. Silakan login kembali.');
            }
        } catch (refreshError) {
            console.error("Error selama proses refresh token:", refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userRole');
            throw new Error(refreshError.message || 'Terjadi masalah saat me-refresh token. Silakan login kembali.');
        }
    }

    // Mengembalikan respons dari request awal atau request yang diulang
    return response;
}
