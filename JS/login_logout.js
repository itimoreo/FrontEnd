document.addEventListener('DOMContentLoaded', (event) => {
    const loginButton = document.getElementById('loginButton');
    const editBanner = document.getElementById('editBanner');
    const token = localStorage.getItem('token');

    if (token) {
        // L'utilisateur est connecté
        loginButton.textContent = 'Logout';
        editBanner.style.display = 'block'; // Montrer le bandeau
    } else {
        // L'utilisateur n'est pas connecté
        loginButton.textContent = 'Login';
        editBanner.style.display = 'none';
    }

    loginButton.addEventListener('click', (event) => {
        if (loginButton.textContent === 'Logout') {
            // L'utilisateur est connecté, donc déconnectez-le
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = 'index.html';
            location.reload(); // Rafraîchir la page
        } else {
            // L'utilisateur n'est pas connecté, donc redirigez-le vers la page de connexion
            window.location.href = 'login.html';
        }
    });
});

window.addEventListener('beforeunload', (event) => {
    // Supprimer le token du LocalStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
});