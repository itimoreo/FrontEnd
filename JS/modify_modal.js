document.addEventListener('DOMContentLoaded', (event) => {
    // Obtenez les éléments de la page
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementById("closeModalButton");
    var form = document.getElementById("addProjectForm");

    // Vérifiez si l'utilisateur est connecté
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');
    if (!token || !userId) {
        // Si le token ou l'ID de l'utilisateur n'est pas stocké, masquez le bouton
        btn.style.display = "none";
        return; // Arrêtez l'exécution du reste du code
    }

    // Lorsque l'utilisateur clique sur le bouton, ouvrez la fenêtre modale
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // Lorsque l'utilisateur clique sur <span> (x), fermez la fenêtre modale
    span.onclick = function() {
      modal.style.display = "none";
    }

    // Lorsque l'utilisateur clique n'importe où en dehors de la fenêtre modale, fermez-la
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Lorsque l'utilisateur soumet le formulaire, ajoutez le projet
    form.onsubmit = function(event) {
      event.preventDefault(); // Empêche le rechargement de la page
      var projectName = document.getElementById("projectName").value;
      var projectImage = document.getElementById("projectImage").value;
      // Ajoutez le projet à la galerie...
    }

    document.getElementById('openAddProjectModalBtn').addEventListener('click', function(event) {
      event.preventDefault(); // Empêche le formulaire d'être soumis
      document.getElementById('addProjectModal').style.display = 'block';
    });
    document.getElementById('closeAddProjectModalButton').addEventListener('click', function() {
      document.getElementById('addProjectModal').style.display = 'none';
    });
});