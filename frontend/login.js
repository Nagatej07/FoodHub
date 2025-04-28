const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const data = { email, password, role };

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login successful! 🎉');
      console.log(result.token); // You can save token if needed
      // window.location.href = '/dashboard.html'; // redirect after login
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong! ❌');
  }
});
