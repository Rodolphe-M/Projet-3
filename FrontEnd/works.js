// Récupération des travaux depuis l'API'
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

// Fonction qui génère les projets
function genererProjets(works) {
    
    for (let i = 0; i < works.length; i++) {
        const article = works[i];
        //Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("article");
        //Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = article.title;

        // On rattache la balise article dans la section gallery
        sectionGallery.appendChild(projetElement);
        // On rattache l'image et la description à la balise elementProjet (article)
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);

    }
}

// Premier affichage des projets
genererProjets(works);

// Récuperation des données catégories de l'API
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponse.category.json();

// bouton filtre objets
const boutonFiltrer = document.querySelector(".btn-objet");

boutonFiltrer.addEventListener("click", function () {
    const projetElement = categories.filter(function (categories) {
        return categories.name === "Objets";

    });
});

