export function renderRegisterForm(onRegisterSuccess) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <form id="registerForm" class="p-4 m-auto" style="max-width:400px;">
      <h2 class="mb-3 text-center">Register</h2>
      <input type="text" id="name" class="form-control mb-2" placeholder="Nama" required />
      <input type="text" id="nik" class="form-control mb-2" placeholder="NIK" required />
      <input type="date" id="tanggalLahir" class="form-control mb-2" placeholder="Tanggal Lahir" required />
      <input type="text" id="domisili" class="form-control mb-2" placeholder="Domisili" required />
      <select id="role" class="form-control mb-2" required>
        <option value="">Pilih Role</option>
        <option value="pasien">Pasien</option>
        <option value="admin">Admin</option>
        <option value="dokter">Dokter</option>
      </select>
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
    const role = document.getElementById('role').value;
    const messageDiv = document.getElementById('regMessage');
    messageDiv.textContent = '';

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nik, tanggalLahir, domisili, role })
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