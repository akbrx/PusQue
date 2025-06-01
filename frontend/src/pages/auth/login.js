export function renderLoginForm(onLoginSuccess) {
  var app = document.getElementById('app');
  app.innerHTML = `
    <form id="loginForm" class="p-4 m-auto" style="max-width:400px;">
      <h2 class="mb-3 text-center">Login</h2>
      <input type="email" id="email" class="form-control mb-2" placeholder="Email" required />
      <input type="password" id="password" class="form-control mb-2" placeholder="Password" required />
      <button type="submit" class="btn btn-primary w-100">Login</button>
      <div class="message mt-2 text-center" id="message"></div>
    </form>
  `;

  var form = document.getElementById('loginForm');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var messageDiv = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    messageDiv.textContent = '';
    messageDiv.classList.remove('text-success', 'text-danger');

    fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (res.ok) {
            localStorage.setItem('accessToken', data.accsessToken); // typo "accsessToken"?
            messageDiv.classList.add('text-success');
            messageDiv.textContent = 'Login berhasil!';
            setTimeout(function () {
              if (typeof onLoginSuccess === 'function') {
                onLoginSuccess();
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
