// Check if already logged in - redirect to dashboard
if (localStorage.getItem('skytrack_admin')) {
    window.location.href = '/dashboard.html';
}

// Simple admin login (username: admin, password: admin123)
const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple check (in production, this should be backend validation)
    if (username === 'admin' && password === 'admin123') {
        // Store auth token
        localStorage.setItem('skytrack_admin', 'true');

        // Redirect to dashboard
        window.location.href = '/dashboard.html';
    } else {
        // Show error
        errorMsg.textContent = 'Invalid username or password';
        errorMsg.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    }
});

// Password visibility toggle
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    // Change icon opacity
    togglePassword.style.opacity = type === 'text' ? '1' : '0.6';
});
