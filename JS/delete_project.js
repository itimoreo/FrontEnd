// Cette fonction nous permet de créer un bouton de suppression
function createDeleteButton(projectId) {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.style.backgroundColor = 'black'; 
    deleteButton.style.border = 'none'; 
    deleteButton.style.cursor = 'pointer'; 
    deleteButton.style.position = 'absolute'; // Positionne le bouton de suppression absolument
    deleteButton.style.top = '10px'; // Positionne le bouton de suppression à 10px du haut de l'élément figure
    deleteButton.style.right = '10px';

    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash-can';
    deleteIcon.style.color = 'white'; 
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener('click', function() {
        // Supprime l'élément figure correspondant de la modal
        var modalFigure = document.getElementById(`project${projectId}`);
        if (modalFigure) {
            modalFigure.remove();
        }

        var galleryFigure = document.getElementById(`galleryProject${projectId}`);
        if (galleryFigure) {
            galleryFigure.remove();
        }

    
    });

    return deleteButton;
}

// Cette fonction nous permet
document.addEventListener('DOMContentLoaded', (event) => {
    var btn = document.getElementById("openModalBtn");
    var modal = document.getElementById("myModal");
    var applyChangesButton = document.getElementById("applyChangesBtn");

    // Récupérez votre jeton du localStorage
    var token = localStorage.getItem('token');

    btn.onclick = function() {
        modal.style.display = "block";

        var existingProjectsContainer = document.getElementById("modalProjectsContainer");

        // Videz le conteneur des projets avant de les ajouter
        existingProjectsContainer.innerHTML = '';

        fetch('http://localhost:5678/api/works')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(projects => {
                // Triez les projets par ID
                projects.sort((a, b) => a.id - b.id);

                projects.forEach(project => {
                    var projectElement = document.createElement('div');
                    projectElement.className = 'project';

                    var projectImage = document.createElement('img');
                    projectImage.src = project.imageUrl;
                    projectElement.appendChild(projectImage);

                    var deleteButton = createDeleteButton();

                    deleteButton.onclick = function() {
                        fetch(`http://localhost:5678/api/works/${project.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                            },
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            projectElement.remove();
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation: ', error);
                        });
                    };

                    projectElement.appendChild(deleteButton);
                    existingProjectsContainer.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    };

    applyChangesButton.onclick = function() {
        fetch('http://localhost:5678/api/works')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(projects => {
                var existingProjectsContainer = document.getElementById("modalProjectsContainer");
    
                // Videz le conteneur des projets avant de les ajouter
                existingProjectsContainer.innerHTML = '';
    
                // Triez les projets par ID
                projects.sort((a, b) => a.id - b.id);

                projects.forEach(project => {
                    var projectElement = document.createElement('div');
                    projectElement.className = 'project';

                    var projectImage = document.createElement('img');
                    projectImage.src = project.imageUrl;
                    projectElement.appendChild(projectImage);

                    var deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'deleteButton';
                    deleteButton.onclick = function() {
                        fetch(`http://localhost:5678/api/works/${project.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                            },
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            existingProjectsContainer.removeChild(projectElement);
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation: ', error);
                        });
                    };

                    projectElement.appendChild(deleteButton);
                    existingProjectsContainer.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation: ', error);
            });
    };
});