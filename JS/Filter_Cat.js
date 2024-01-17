
// Fonction qui appelle l'API et affiche les données
async function callAPI(categoryId){
    //Cette constante est l'URL de l'API
    const url = "http://localhost:5678/api/works"
    //Cette constante est la réponse de l'API
    const fetcher = await fetch(url)
    //Cette constante est la réponse de l'API en JSON
    const json = await fetcher.json()
    
    //Cette variable est la réponse de l'API en JSON filtrée
    let jsonFiltered = json;
    //Si categoryId est défini, alors on filtre les données
    if (categoryId) {
        //On filtre les données en fonction de la catégorie
        jsonFiltered = json.filter((projet, index) => {
            //On retourne les données qui ont la même categoryId que celui passé en paramètre
            return projet.categoryId == categoryId;
        })
    }
    //On affiche les données filtrées
    displayData(jsonFiltered);
}
// Fonction qui affiche les données
function displayData(data) {
    //Cette constante est la galerie
    const gallery = document.getElementById('gallery');
    //On efface le contenu précédent de la galerie
    gallery.innerHTML = ''; 

    // On créer une boucle  
    data.forEach(item => {
        //On déclare une variable qui créer une balise div dans le HTML
        let div = document.createElement('div');
        div.className = 'project';

        //On déclare une variable qui créer une balise img dans le HTML
        let img = document.createElement('img');
        //On ajoute au img la source de l'image qui est égale à l'URL de l'image
        img.src = item.imageUrl;
        //
        div.appendChild(img);

        //On déclare une variable qui créer une balise p dans le HTML
        let p = document.createElement('p');
        //On ajoute au p le titre du projet
        p.textContent = item.title;
        div.appendChild(p);

        gallery.appendChild(div);
    });
}
// Fonction qui active le filtre
function activateFilter(filterElement, filters) {
    //On enlève la classe F-activated à tous les filtres
    filters.forEach(filter => filter.classList.remove("F-activated"));
    //On ajoute la classe F-activated au filtre qui a été cliqué
    filterElement.classList.add("F-activated");
}

// Fonction qui appelle l'API au chargement de la page
document.addEventListener('DOMContentLoaded', (event) => {
    //On déclare les variables des filtres
    const filterTous = document.getElementById("fTous");
    const filterObj = document.getElementById("fObj");
    const filterAppt = document.getElementById("fAppt");
    const filterHotRest = document.getElementById("fHotRest");

    //On déclare un tableau qui contient tous les filtres
    let filters = [filterTous, filterObj, filterAppt, filterHotRest];

    //on ajoute une écoute d'évènement à chaque clic sur un filtre
    filterTous.addEventListener('click', () => {
        //On active le filtre avec les paramètres du filtre et du tableau de filtres
        activateFilter(filterTous, filters);
        //On appelle l'API avec le paramètre de la catégorie
        callAPI();
    });
    filterObj.addEventListener('click', () => {
        activateFilter(filterObj, filters);
        //On appelle l'API avec le paramètre de la catégorie
        callAPI(1);
    });
    filterAppt.addEventListener('click', () => {
        activateFilter(filterAppt, filters);
        callAPI(2);
    });
    filterHotRest.addEventListener('click', () => {
        activateFilter(filterHotRest, filters);
        callAPI(3);
    });
});

callAPI();

//Note 
// categoryId 1 = Objets
// categoryId 2 = Appartements
// categoryId 3 = Hotels et restau