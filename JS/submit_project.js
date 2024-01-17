// Fonction qui ajoute un projet à la modal
function addProjectToModal(project) {
    // On récupère le conteneur des projets
    const modalProjectsContainer = document.getElementById('modalProjectsContainer');

    // On crée un élément figure
    let figure = document.createElement('figure');
    figure.id = `project${project.id}`; // Ajoute un ID à l'élément de projet

    // On crée un élément img
    let img = document.createElement('img');
    img.src = project.imageUrl;
    figure.appendChild(img);

    // On crée un élément figcaption
    let figcaption = document.createElement('figcaption');
    figcaption.textContent = project.title;
    figure.appendChild(figcaption);

    modalProjectsContainer.appendChild(figure);
}

// Fonction qui ajoute un projet à la galerie
function addProjectToGallery(project) {
    const gallery = document.getElementById('gallery');

    let figure = document.createElement('figure');
    figure.id = `project${project.id}`; // Ajoute un ID à l'élément de projet
    figure.classList.add(`f${project.categoryId}`); // Ajoute la categoryId comme une classe

    let img = document.createElement('img');
    img.src = project.imageUrl;
    figure.appendChild(img);

    let figcaption = document.createElement('figcaption');
    figcaption.textContent = project.title;
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
}

// Fonction qui supprime un projet de la page
function removeProjectFromPage(projectId) {
    const projectElement = document.getElementById(`project${projectId}`);
    projectElement.remove();
}

// Gestionnaire d'événements pour le formulaire d'ajout de projet
document.getElementById('addProjectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Ces constantes sont utilisées pour créer un objet FormData
    const userId = localStorage.getItem('userId');
    const projectName = document.getElementById('projectName').value;
    const projectImage = document.getElementById('projectImage').files[0];
    const categoryId = document.getElementById('categoryId').value; // Récupère la categoryId du formulaire

    // On créer l'objet FormData qui contient les données du formulaire
    const formData = new FormData();
    formData.append("image", projectImage);
    formData.append("title", projectName);
    formData.append("category", categoryId); // Utilise la categoryId du formulaire
    formData.append("userId", userId);

    // On appelle la fonction publishProject qui envoie les données à l'API
    publishProject(formData)
        .then(newProject => {
            addProjectToModal(newProject);
            addProjectToGallery(newProject); // Ajoute le projet à la galerie
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Gestionnaire d'événements pour la prévisualisation de l'image
document.addEventListener('DOMContentLoaded', function() {
    // On ajoute un gestionnaire d'événements pour le changement de l'image
    document.getElementById('projectImage').addEventListener('change', function(e) {
        // On vérifie que le fichier ne dépasse pas 4 Mo
        if(this.files[0].size > 4000000){
           alert("Le fichier est trop gros!");
           this.value = "";
        } else {
            // On affiche le nom du fichier
           document.getElementById('file-name').textContent = this.files[0].name;
           const reader = new FileReader();
           // On affiche l'image dans la balise <img>
           reader.onload = function(event) {
               document.getElementById('imagePreview').src = event.target.result;
               document.getElementById('addPhotoButton').style.display = 'none'; // Cache le bouton
           }
           reader.readAsDataURL(e.target.files[0]);
        }
    });
});

async function publishProject(formData) {
    const url = "http://localhost:5678/api/works"
    const token = localStorage.getItem('token');

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function deleteProject(projectId) {
    const url = `http://localhost:5678/api/works/${projectId}`;
    const token = localStorage.getItem('token');

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    removeProjectFromPage(projectId);

    document.getElementById('projectImage').onchange = function () {
        if(this.files[0].size > 4000000){
           alert("Le fichier est trop gros!");
           this.value = "";
        } else {
           document.getElementById('file-name').textContent = this.files[0].name;
        }
    };
}

