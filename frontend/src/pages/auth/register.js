export function renderRegisterForm(onRegisterSuccess) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <form id="registerForm" class="p-4 m-auto" style="max-width:400px;">
      <h2 class="mb-3 text-center">Register</h2>
      <div class="mb-2">
        <label for="name" class="form-label">Nama</label>
        <input type="text" id="name" class="form-control" required />
      </div>
      <div class="mb-2">
        <label for="nik" class="form-label">NIK</label>
        <input type="text" id="nik" class="form-control" required />
      </div>
      <div class="mb-2">
        <label for="tanggalLahir" class="form-label">Tanggal Lahir</label>
        <input type="date" id="tanggalLahir" class="form-control" required />
      </div>
      <div class="mb-2">
        <label for="domisili" class="form-label">Domisili</label>
        <input type="text" id="domisili" class="form-control" required />
      </div>
      <div class="mb-2">
      </div>
      <div class="mb-2">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" required />
      </div>
      <div class="mb-2">
        <label for="confPassword" class="form-label">Konfirmasi Password</label>
        <input type="password" id="confPassword" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success w-100">Register</button>
      <div class="message mt-2 text-center" id="regMessage"></div>
      <p class="mt-3 text-center">
        Sudah punya akun? <a href="#/login">Login di sini</a>
      </p>
    </form>
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

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nik, tanggalLahir, domisili, password, confPassword })
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