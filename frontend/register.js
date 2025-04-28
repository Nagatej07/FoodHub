const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const role = document.getElementById('role').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match! ❌');
    return;
  }

  const userData = { fullName, email, phone, address, password, role };

  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Account created successfully! 🎉');
      window.location.href = 'login.html'; // Redirect to login
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong during registration! ❌');
  }
});
