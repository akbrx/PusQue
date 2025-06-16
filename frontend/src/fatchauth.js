// auth-fetch.js
export async function authFetch(url, options = {}) {
  localStorage.setItem('accessToken', accessToken);

// decode role dari token (opsional), tapi lebih aman backend kirim role lagi
const payload = JSON.parse(atob(accessToken.split('.')[1]));
localStorage.setItem('userRole', payload.role);
  
  // Default headers
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };
  options.credentials = 'include'; // penting untuk mengirim cookie refreshToken

  let response = await fetch(url, options);

  // Jika accessToken kadaluarsa
  if (response.status === 401) {
    // Minta token baru dari backend
    const tokenRes = await fetch('https://serverpusque-production.up.railway.app/token', {
      method: 'GET',
      credentials: 'include'
    });

    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      accessToken = tokenData.accessToken;
      localStorage.setItem('accessToken', accessToken);

      // Ulangi request asli dengan token baru
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    } else {
      throw new Error('Tidak dapat refresh token');
    }
  }

  return response;
}
