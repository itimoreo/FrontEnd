// Cette fonction est appelée au chargement de la page
document.addEventListener('DOMContentLoaded', (event) => {
    //  On créer une constante qui récupère l'id password
    const passwordInput = document.getElementById('password');
    
    document.getElementById('showPassword').addEventListener('change', (event) => {
        passwordInput.type = event.target.checked ? 'text' : 'password';
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.userId && data.token) {
                // L'utilisateur est connecté
                alert('You are now logged in');
                // Stocker le userId et le token dans le LocalStorage
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('token', data.token);
                // Log the current state of localStorage
                console.log('userId:', localStorage.getItem('userId'));
                console.log('token:', localStorage.getItem('token'));
                window.location.href = 'index.html';
                console.log(data);
            }  else {
                // Les informations de connexion sont incorrectes
                alert('Incorrect email or password');
                console.log(data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while logging in');
        });
    });
});