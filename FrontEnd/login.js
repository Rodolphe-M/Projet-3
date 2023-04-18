const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.querySelector('#login-form input[type="submit"]');

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Vérification que les champs ne sont pas vides
    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
        alert("Veuillez remplir tous les champs.");
        return false;
    }

    // Appel à l'API pour vérifier l'authentification de l'utilisateur
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Vérification de la réponse de l'API
    const data = await response.json();
    if (response.ok) {
        alert("Authentification réussie !");

        // Stockage de l'ID et du token de l'utilisateur dans le localStorage
        // localStorage.setItem('user_id', data.user_id);
        // localStorage.setItem('user_token', data.user_token);

        // Redirection vers index.html
        window.location.href = "index.html";
    } else {
        alert(data.message || "Identifiants incorrects. Veuillez réessayer.");
    }
});

