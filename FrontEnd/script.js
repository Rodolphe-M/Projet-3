// Récupération des travaux depuis l'API'
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

// Fonction qui génère les projets
function genererProjets(works) {

    document.querySelector(".gallery").innerHTML = "";
    
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


// bouton filtre objets
const boutonFiltrerObjets = document.querySelector("#btn-objets");
boutonFiltrerObjets.addEventListener("click", function() {
    const objetsFiltre = works.filter((work) => {
        return work.category.name === "Objets"
    })
    // Regénération de la page avec les objets uniquement  
    genererProjets(objetsFiltre);
});

// bouton filtre appartements
const boutonFiltrerAppartements = document.querySelector("#btn-appartements");
boutonFiltrerAppartements.addEventListener("click", function() {
    const appartementsFiltre = works.filter((work) => {
        return work.category.name === "Appartements"
    })
    // Regénération de la page avec les appartements uniquement  
    genererProjets(appartementsFiltre);
});

// bouton filtre appartements
const boutonFiltrerHotels = document.querySelector("#btn-hotels");
boutonFiltrerHotels.addEventListener("click", function() {
    const hotelsFiltre = works.filter((work) => {
        return work.category.name === "Hotels & restaurants"
    })
    // Regénération de la page avec les appartements uniquement  
    genererProjets(hotelsFiltre);
});

// bouton filtre appartements
const boutonTous = document.querySelector("#btn-tous");
boutonTous.addEventListener("click", function() {
    const afficherTous = works.filter(() => {
        return genererProjets
    })
    // Regénération de la page avec les appartements uniquement  
    genererProjets(afficherTous);
});

// Affichage mode ADMIN

// Selection des éléments à masquer
const hiddenElements = document.querySelectorAll('.hidden');
// Application de la propriété display: none aux éléments
    hiddenElements.forEach(element => {
    element.style.display = 'none';
})

// Affichage des elements du dom en mode admin
function pageAdmin() {
    // Vérification de la présence du token et de l'userId
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    // Si présence token et id alors...
    if (userId && token) {
      // On selectionne les classes hidden et not-hidden  
      const elementsHidden = document.querySelectorAll('.hidden');
      const elementsNotHidden = document.querySelectorAll('.not-hidden');
      // On fait apparaitre les .hidden
      elementsHidden.forEach(element => {
        element.style.display = 'block';
      });
      // On masque les éléments .not-hidden
      elementsNotHidden.forEach(element => {
        element.style.display = 'none';
      });
    }
  }
  // Appel de la fonction
  pageAdmin();

