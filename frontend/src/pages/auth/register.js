import loginimg from "../../assets/images/login.png"
export function renderRegisterForm(onRegisterSuccess) {
  const app = document.getElementById('app');
  app.innerHTML = `
  <section class="container py-5">
  <div class="d-flex justify-content-center align-items-center min-vh-10">
    <div class="card shadow" style="width: 100%; max-width: 800px; border-radius: 15px;">
      <div class="card-body p-0">
        <div class="d-flex" style="height: 100%;">
          <!-- Form Register (50%) -->
          <div class="register-wrap p-4 p-md-5" style="width: 50%;">
            <h2 class="mb-3 text-start">Register</h2>
            <p class="mb-3 text-start small">Silakan isi data untuk membuat akun baru.</p>
            <form id="registerForm" class="register-form">
              <div class="form-floating mb-3">
                <input type="text" id="name" class="form-control" placeholder="Nama" required />
                <label for="name">Nama</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" id="nik" class="form-control" placeholder="NIK" required />
                <label for="nik">NIK</label>
              </div>
              <div class="form-floating mb-3">
                <input type="date" id="tanggalLahir" class="form-control" placeholder="Tanggal Lahir" required />
                <label for="tanggalLahir">Tanggal Lahir</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" id="domisili" class="form-control" placeholder="Domisili" required />
                <label for="domisili">Domisili</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" id="password" class="form-control" placeholder="Password" required />
                <label for="password">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" id="confPassword" class="form-control" placeholder="Konfirmasi Password" required />
                <label for="confPassword">Konfirmasi Password</label>
              </div>
              <div class="mb-3">
                <label for="fotoKtp" class="form-label">Foto KTP</label>
                <input type="file" id="fotoKtp" name="fotoKtp" accept="image/*" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded submit px-3">Register</button>
              <div class="message mt-2 text-center" id="regMessage"></div>
              <p class="mt-3 text-center">
                Sudah punya akun? <a href="#/login">Login di sini</a>
              </p>
            </form>
          </div>

          <!-- Gambar Register (50%) -->
          <div class="register-img" style="width: 50%; background-image: url(${loginimg}); background-size: cover; background-position: center; border-radius: 15px;"></div>
        </div>
      </div>
    </div>
  </div>
</section>

  `;

  const form = document.getElementById('registerForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const nik = document.getElementById('nik').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const domisili = document.getElementById('domisili').value.trim();
    const password = document.getElementById('password').value;
    const confPassword = document.getElementById('confPassword').value;
    const messageDiv = document.getElementById('regMessage');
    messageDiv.textContent = '';

    // FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('nik', nik);
    formData.append('tanggalLahir', tanggalLahir);
    formData.append('domisili', domisili);
    formData.append('password', password);
    formData.append('confPassword', confPassword);
    formData.append('fotoKtp', document.getElementById('fotoKtp').files[0]);

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        messageDiv.classList.remove('text-danger');
        messageDiv.classList.add('text-success');
        messageDiv.textContent = 'Register berhasil! Silakan login.';
        setTimeout(() => {
          if (typeof onRegisterSuccess === 'function') {
            onRegisterSuccess();
          } else {
            window.location.hash = "#/login";
          }
        }, 1500);
      } else {
        messageDiv.classList.remove('text-success');
        messageDiv.classList.add('text-danger');
        messageDiv.textContent = data.message || 'Register gagal';
      }
    } catch (err) {
      messageDiv.classList.remove('text-success');
      messageDiv.classList.add('text-danger');
      messageDiv.textContent = 'Terjadi error koneksi';
    }
  });
}