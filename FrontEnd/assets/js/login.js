// Variables pour le login
const inputs = document.querySelectorAll("input");
const errorMessage = document.querySelector(".error-message");
const loginBtn = document.querySelector(".login-btn");
const form = document.querySelector("form"); // Sélectionnez votre formulaire en utilisant le sélecteur approprié.



function loginRequest(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).

    const emailValue = inputs[0].value;
    const passwordValue = inputs[1].value;

    let loginRequest = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
        }),
        mode: "cors",
        credentials: "same-origin",
    };

    fetch("http://localhost:5678/api/users/login", loginRequest)
        .then(res => res.json())
        .then(data => {
            let token = data.token;
            localStorage.setItem("Token", token);
            if (token) {
                window.location.href = "./index.html";
            } else {
                errorMessage.style.visibility = "visible";
            }
        });
}

form.addEventListener("submit", loginRequest);

inputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            loginRequest(e); // Passez l'événement à la fonction loginRequest.
        }
    });
});





/**
 * TODO :
 * 
 *  Accueil :
 * - Récupérer les bouttons de catégories dynamiquement
 * 
 *  Login : 
 * - Récupérer les valeurs du formulaire en javascript 
 * ---- Note: Lorsque tu met un eventListener sur le submit du formulaire, pensez à event.preventDefault()
 * - Vérifier l'intégrité des valeurs (pas de password vide, ou email sans le bon format)
 * ---- Note: Si erreur, on l'affiche dans un <p>, pour vérifier soit tu le fais à la main, soit tu utilise l'api html form, soit tu utilise des regex
 * - Envoyer ces données via l'api 
 * ---- Note: Penser à ce mettre en POST et envoyer les données
 *  
 */
