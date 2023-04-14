// Récupération des travaux depuis l'API'
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Création des balises
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

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);

}

