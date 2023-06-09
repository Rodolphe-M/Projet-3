let modal = null

// Const ouverture modale
const openModal = function (e) {
    e.preventDefault()
    //Ciblage élément pour l'ouverture de la modale
    const target = document.querySelector(e.target.getAttribute('href'))
    // Affichage boite modale / annulation display:none du html et du aria-hidden
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    // fermeture modale en cliquant sur le coté de la modale
    modal = target
    modal.addEventListener('click', closeModal)
    // fermeture de la modale avec le button de class : js-modal-close
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    //Stop propagation parents
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

// Const fermeture de la modale
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    // on remasque la boite modale
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
    // selection de l'élément pour ajouter le message en cas de réussite du chargement
    document.querySelector('.ajout-valide').style.display = "none";
    const form = document.getElementById("file-form");

    // Réinitialisez le formulaire
    form.reset();

    const divForm = document.getElementById('image-preview');
    divForm.innerHTML = ""; // Supprime le contenu de la div "image-preview"

    const fileReaderDiv = document.querySelector('.file-reader');
        fileReaderDiv.style.display = 'flex';


}

// Empêche la propagation vers le parent pour ne pas fermer la modale en cliquant dessus.
const stopPropagation = function (e) {
    e.stopPropagation()
}

// Selection des class js-modal et ouverture modale au clic
document.getElementById('btn-modifier-projets').addEventListener('click', openModal);


// Fermeture modale sur clic touche esc/escape
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

