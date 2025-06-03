import loginimg from "../../assets/images/login.png"
export function renderLoginForm(onLoginSuccess) {
  var app = document.getElementById('app');
  app.innerHTML = `
  <section class="container py-5">
  <div class="d-flex justify-content-center align-items-center min-vh-10">
    <div class="card shadow" style="width: 100%; max-width: 800px;  border-radius: 15px;">
      <div class="card-body p-0">
        <div class="d-flex" style="height: 100%;">
          <!-- Form Login (50%) -->
          <div class="login-wrap p-4 p-md-5" style="width: 50%;">
            <h2 class="mb-3 text-start">Login</h2>
            <p class="mb-3 text-start small">Silahkan login menggunakan akun anda.</p>
            <form id="loginForm" class="signin-form">
              <div class="form-floating mb-3">
              <input type="text" id="nik" class="form-control" placeholder="NIK" required />
                <label for="nik">NIK</label>
              </div>
              <div class="form-floating mb-3">
              <input type="password" id="password" class="form-control" placeholder="Password" required />
              <label class="label" for="password">Password</label>
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-primary rounded submit px-3">Login</button>
              </div>
              <div class="message mt-2 text-center" id="message"></div>
              <p class="mt-3 text-center">
                Belum punya akun? <a href="#/register">Register di sini</a>
              </p>
            </form>
          </div>

          <!-- Gambar Login (50%) -->
          <div class="login-img" style="width: 50%; background-image: url(${loginimg}); background-size: cover; background-position: center;  border-radius: 15px;"></div>
        </div>
      </div>
    </div>
  </div>
</section>

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
