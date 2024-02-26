// Variables pour le login
const inputs = document.querySelectorAll("input");
const errorMessage = document.querySelector(".error-message");
const loginBtn = document.querySelector(".login-btn");
const form = document.querySelector("form"); // Sélectionnez votre formulaire en utilisant le sélecteur approprié.

// Fonction de requête de connexion
// Cette fonction fait une requête POST à l'API pour se connecter
// Elle prend les valeurs des champs email et password en paramètres
function loginRequest(event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).

  // Récupération des valeurs des champs email et password
  // Les valeurs sont stockées dans les variables emailValue et passwordValue
  // Ces valeurs sont utilisées pour se connecter à l'API
  const emailValue = inputs[0].value;
  const passwordValue = inputs[1].value;

  // Envoi de la requête pour se connecter
  // La requête est une requête POST avec les données de connexion
  // Si la connexion est réussie, l'utilisateur est redirigé vers la page d'accueil
  let loginRequest = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  // Requête POST a l'API pour se connecter
  // L'API retourne un token si la connexion est réussie
  fetch("http://localhost:5678/api/users/login", loginRequest)
    .then((res) => res.json())
    .then((data) => {
      let token = data.token;
      localStorage.setItem("Token", token);
      // Si la connexion est réussie, alors on redirige l'utilisateur vers la page d'accueil
      if (token) {
        window.location.href = "./index.html";
      }
      // Si la connexion est un échec, alors on affiche un message d'erreur
      else {
        errorMessage.style.visibility = "visible";
      }
    });
}

// Écoutez l'événement submit sur votre formulaire
// Lorsque le formulaire est soumis, appelez la fonction
// loginRequest et passez l'événement à la fonction.
// Cela empêchera le comportement par défaut du formulaire.
form.addEventListener("submit", loginRequest);

inputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    // Si la touche appuyée est "Enter", appelez la fonction loginRequest.
    // Passez l'événement à la fonction.
    if (e.key === "Enter") {
      loginRequest(e); // Passez l'événement à la fonction loginRequest.
    }
  });
});
