export function renderLoginForm(onLoginSuccess) {
  var app = document.getElementById('app');
  app.innerHTML = `
    <form id="loginForm" class="p-4 m-auto" style="max-width:400px;">
      <h2 class="mb-3 text-center">Login</h2>
      <input type="text" id="nik" class="form-control mb-2" placeholder="NIK" required />
      <input type="password" id="password" class="form-control mb-2" placeholder="Password" required />
      <button type="submit" class="btn btn-primary w-100">Login</button>
      <div class="message mt-2 text-center" id="message"></div>
      <p class="mt-3 text-center">
        Belum punya akun? <a href="#/register">Register di sini</a>
      </p>
    </form>
  `;

  var form = document.getElementById('loginForm');
  var nikInput = document.getElementById('nik');
  var passwordInput = document.getElementById('password');
  var messageDiv = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nik = nikInput.value.trim();
    var password = passwordInput.value.trim();
    messageDiv.textContent = '';
    messageDiv.classList.remove('text-success', 'text-danger');

    fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nik: nik, password: password })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (res.ok) {
            localStorage.setItem('accessToken', data.accessToken); 
            localStorage.setItem('userRole', data.role);
            messageDiv.classList.add('text-success');
            messageDiv.textContent = 'Login berhasil!';
            setTimeout(function () {
              // Redirect sesuai role
              if (data.role === 'admin') {
                window.location.hash = "#/beranda";
              } else if (data.role === 'dokter') {
                window.location.hash = "#/dokter";
              } else {
                if (typeof onLoginSuccess === 'function') {
                  onLoginSuccess();
                } else {
                  window.location.hash = "#/";
                }
              }
            }, 1000);
          } else {
            messageDiv.classList.add('text-danger');
            messageDiv.textContent = data.message || 'Login gagal';
          }
        });
      })
      .catch(function () {
        messageDiv.classList.add('text-danger');
        messageDiv.textContent = 'Terjadi error koneksi';
      });
  });
}
