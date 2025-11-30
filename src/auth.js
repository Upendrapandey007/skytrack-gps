// Check if user is logged in
if (!localStorage.getItem('skytrack_admin')) {
    // Redirect to login if not authenticated
    window.location.href = '/login.html';
}

// Add logout functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'logout-btn';
    logoutBtn.style.cssText = `
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 10000;
    background: rgba(248, 113, 113, 0.2);
    border: 1px solid #f87171;
    color: #f87171;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  `;

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('skytrack_admin');
        window.location.href = '/';
    });

    logoutBtn.addEventListener('mouseenter', () => {
        logoutBtn.style.background = '#f87171';
        logoutBtn.style.color = '#0f172a';
    });

    logoutBtn.addEventListener('mouseleave', () => {
        logoutBtn.style.background = 'rgba(248, 113, 113, 0.2)';
        logoutBtn.style.color = '#f87171';
    });

    document.body.appendChild(logoutBtn);
});
