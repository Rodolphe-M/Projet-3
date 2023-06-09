// Récupération des travaux depuis l'API'
const reponseWorks = await fetch("http://localhost:5678/api/works");
let works = await reponseWorks.json();

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
boutonFiltrerObjets.addEventListener("click", function () {
    const objetsFiltre = works.filter((work) => {
        return work.category.name === "Objets"
    })
    // Regénération de la page avec les objets uniquement  
    genererProjets(objetsFiltre);
});

// bouton filtre appartements
const boutonFiltrerAppartements = document.querySelector("#btn-appartements");
boutonFiltrerAppartements.addEventListener("click", function () {
    const appartementsFiltre = works.filter((work) => {
        return work.category.name === "Appartements"
    })
    // Regénération de la page avec les appartements uniquement  
    genererProjets(appartementsFiltre);
});

// bouton filtre appartements
const boutonFiltrerHotels = document.querySelector("#btn-hotels");
boutonFiltrerHotels.addEventListener("click", function () {
    const hotelsFiltre = works.filter((work) => {
        return work.category.name === "Hotels & restaurants"
    })
    // Regénération de la page avec les appartements uniquement  
    genererProjets(hotelsFiltre);
});

// bouton filtre appartements
const boutonTous = document.querySelector("#btn-tous");
boutonTous.addEventListener("click", function () {
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

let workId;

// Fonction qui génère les projets
async function genererProjetsModal(works) {

    document.querySelector(".modal-gallery").innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const articleModal = works[i];
        //Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGalleryModal = document.querySelector(".modal-gallery");
        // Création d’une balise dédiée à un projet
        const projetElementModal = document.createElement("article");
        //Création des balises
        const imageElementModal = document.createElement("img");
        imageElementModal.src = articleModal.imageUrl;
        // Ajout Logo trash
        const trashIconModal = document.createElement("i");
        trashIconModal.classList.add("fa-solid", "fa-trash-can");
        // on rattache le logo <i> au button
        const trashButtonModal = document.createElement("button");
        trashButtonModal.appendChild(trashIconModal);
        // Création d'une classe ="trash-button"
        trashButtonModal.classList.add("trash-button");
        trashButtonModal.id = "btn-delete";
        //Modification <p>
        const titleElementModal = document.createElement("p");
        titleElementModal.innerText = "éditer";


        // Suppression projet       
        // Ajout de l'écouteur d'événement sur le bouton trash-button
        trashButtonModal.addEventListener("click", function () {
            workId = articleModal.id;
            console.log(workId);
            const token = localStorage.getItem('token');
            console.log(token);
            // Demander confirmation de la suppression
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
            if (confirmation) {
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }).then(response => {

                    if (response.status === 204) {
                        const index = works.findIndex(work => work.id === workId);
                        works.splice(index, 1);
                        genererProjetsModal(works);
                        document.querySelector(".gallery").innerHTML = "";
                        genererProjets(works);

                    } else if (response.status === 401) {
                        console.error("Non autorisé !");
                    } else if (response.status === 500) {
                        console.error("Comportement inattendu !");
                    } else {
                        console.error("Une erreur s'est produite !");
                    }
                })
            }
        });

        // On rattache la balise article dans la section gallery
        sectionGalleryModal.appendChild(projetElementModal);
        // On rattache l'image et la description à la balise elementProjet (article)
        projetElementModal.appendChild(imageElementModal);
        projetElementModal.appendChild(titleElementModal);
        // Ajout du bouton Trash
        projetElementModal.appendChild(trashButtonModal);
    }
};


// Function pour switcher d'une modale à l'autre
function switchModal() {
    const hiddenElements = document.querySelectorAll('.hidden-modal');
    const notHiddenElements = document.querySelectorAll('.not-hidden-modal');

    // Afficher ou masquer les éléments de la modale
    const switchElements = (elements, display, visibility) => {
        elements.forEach(element => {
            element.style.display = display;
            element.style.visibility = visibility;
        });
    };

    // Ouvrir la modale 2 au clic
    document.querySelector('#btn-add-work').addEventListener('click', () => {
        switchElements(hiddenElements, 'block', 'visible');
        switchElements(notHiddenElements, 'none', '');
    });

    // Revenir en arrière au clic sur la flêche
    document.querySelector('.js-modal-return').addEventListener('click', () => {
        switchElements(hiddenElements, 'none', 'hidden');
        switchElements(notHiddenElements, 'block', '');
    });
}

switchModal();


// Déconnexion, suppression id et token => raffraichissement de la page
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    location.reload();
});

// Ajout projet sur l'API
function addWorks() {
    const form = document.querySelector('#file-form');
    const image = document.getElementById('input-file');
    const title = document.querySelector('#titre');
    const categories = document.querySelector('#categories');
    const btnSubmitFile = document.querySelector('#btn-submit-file');
    const btnSubmitPhoto = document.querySelector('#btn-submit-photo');
    const inputFile = document.querySelector('#input-file');

    // Ajout event listener au clic sur le bouton ajout photo cela active l'input file
    btnSubmitPhoto.addEventListener('click', (e) => {
        e.preventDefault();
        inputFile.click();
    });

    // Changement du comportement par default du input photo (pas de submit form)
    inputFile.addEventListener('change', (event) => {
        event.preventDefault();
    });


    // Affiche de l'image avec l'objet fileReader
    inputFile.addEventListener('change', previewFile);

    function previewFile() {

        const fileExtensionRegex = /\.(jpe?g|png)$/i;

        if (this.files.length === 0 || !fileExtensionRegex.test(this.files[0].name)) {
            return;
        }

        const file = this.files[0];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.addEventListener('load', (event) =>
            displayImage(event, file));

    }

    function displayImage(event, file) {

        const figureElement = document.createElement('figure');
        figureElement.id = "image-selected";

        const imageElement = document.createElement('img');
        imageElement.src = event.target.result;

        figureElement.appendChild(imageElement);

        const divForm = document.getElementById('image-preview');
        divForm.innerHTML = "";
        divForm.appendChild(imageElement);

        document.body.querySelector('#image-preview').appendChild(figureElement);

        const fileReaderDiv = document.querySelector('.file-reader');
        fileReaderDiv.style.display = 'none';


    }


    // Au clic sur le bouton Envoyer soumet le formulaire
        btnSubmitFile.addEventListener('click', (event) => {
            event.preventDefault();
            form.querySelector('#input-file');
            console.log(btnSubmitFile);
        

        // Set l'objet formData
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('category', parseInt(categories.options[categories.selectedIndex].id)); // Convertir l'ID en entier
        formData.append('image', image.files[0]);

        // Set le token
        const token = localStorage.getItem('token');
        console.log(token);

        // Envoi du projet avec methode POST à l'api
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.status === 201) {
                    document.querySelector('.ajout-valide').style.display = "block";
                    return response.json();

                } else if (response.status === 401) {
                    alert("Non autorisé !");
                } else if (response.status === 500) {
                    alert("Comportement inattendu !");
                } else {
                    alert("Une erreur s'est produite !");
                }
            })
            .then(data => {
                if (data) {
                    works.push(data); // Ajoutez le nouveau projet à la liste
                    document.querySelector(".modal-gallery").innerHTML = "";
                    genererProjetsModal(works); // Régénère la galerie modale avec les nouvelles données
                    document.querySelector(".gallery").innerHTML = "";
                    genererProjets(works); // Régénère la galerie principale avec les nouvelles données
                }
            });
       
});

};

addWorks();

genererProjetsModal(works);





