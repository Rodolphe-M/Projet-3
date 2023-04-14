// Récupération des travaux depuis l'API'
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Création des balises
const article = works[0];

const imageElement = document.createElement("img");
imageElement.src = article.imageUrl;

const titleElement = document.createElement("p");
titleElement.innerText = article.title;

//Rattachement des balises au DOM
const sectionGallery = document.querySelector(".gallery");


sectionGallery.appendChild(imageElement);
sectionGallery.appendChild(titleElement);