// Variables
const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");
const modalImg = document.querySelector(".modal_img");
const modal = document.querySelector("dialog");
const modalButton = document.querySelectorAll(".modal-button");
const closeModalIcon = document.querySelector(".close_modal_icon");
const modalContent = document.querySelector(".modal_content");
const editingToolsBanner = document.querySelector(".editing-tools-banner");
const login = document.querySelector(".login");

// Div .filter-container
const filterContainer = document.querySelector(".filter-container");

// Fonction qui retourne les Works
// Cette fonction fait une requête GET à l'API pour obtenir les works
// L'API retourne un tableau de works
async function getWorks() {
  return await fetch("http://localhost:5678/api/works").then((res) =>
    res.json()
  );
}

// Fonction qui retourne les catégories
// Cette fonction fait une requête GET à l'API pour obtenir les catégories
// L'API retourne un tableau de catégories
async function categoriesImport() {
  return await fetch("http://localhost:5678/api/categories").then((res) =>
    res.json()
  );
}

// Fonction qui réinitialise l'affichage de gallery
// Cette fonction supprime tous les éléments enfants de gallery
function resetDisplayGallery() {
  gallery.innerHTML = "";
}

// Fonction qui affiche un work dans la galerie
// Elle prend en paramètre le work à afficher et ajoute ce work à la galerie
// Elle crée un élément figure avec une image et un titre
// Elle ajoute cet élément figure à la galerie
function displayWork(work) {
  const figure = document.createElement("figure");
  figure.classList = work.category.name;
  figure.setAttribute("data-id", work.id);

  figure.innerHTML = `
         <img src="${work.imageUrl}" alt="${work.title}" />
         <figcaption>${work.title}</figcaption>
        `;

  gallery.appendChild(figure);
}

// Fonction qui affiche les works dans la galerie
// Elle prend en paramètre un tableau de works et les affiche dans la galerie
// Elle utilise la fonction displayWork pour afficher chaque work
// Elle réinitialise l'affichage de la galerie avant d'ajouter les works
function displayWorks(worksArray) {
  // Réinitialise l'affichage de gallery
  resetDisplayGallery();

  // Ajout des projets dans gallery
  worksArray.forEach((work) => {
    displayWork(work);
  });
}

// Tableau de données pour les boutons de filtre
// Chaque bouton a un id et un texte
// L'id correspond à l'id de la catégorie
const buttonData = [
  { id: -1, text: "Tous" },
  { id: 1, text: "Objets" },
  { id: 2, text: "Appartements" },
  { id: 3, text: "Hotels & restaurants" },
];

// Fonction qui crée les boutons de filtre
// Elle crée un bouton pour chaque élément du tableau buttonData
// Elle ajoute chaque bouton à filterContainer
function createButtons() {
  buttonData.forEach((data) => {
    const button = document.createElement("button");
    button.className = "filter";
    button.setAttribute("data-id", data.id);
    button.textContent = data.text;
    filterContainer.appendChild(button);
  });
}

// Fonction qui filtre les works
// Elle ajoute un écouteur d'événement à chaque bouton de filtre
// Lorsque l'utilisateur clique sur un bouton, elle filtre les works en fonction de l'id du bouton
// Elle utilise la fonction displayWorks pour afficher les works filtrés
function worksFilter() {
  const filters = document.querySelectorAll(".filter");

  // Ajoute un écouteur d'événement à chaque bouton de filtre
  filters.forEach((filter) => {
    filter.addEventListener("click", async () => {
      const filterValue = filter.getAttribute("data-id");
      const works = await getWorks();
      let filteredWorks = [];

      // Si le filtre est -1, on affiche tous les works
      if (filterValue === "-1") {
        filteredWorks = works;
      }
      // Sinon, on filtre les works en fonction de l'id du bouton
      else {
        filteredWorks = works.filter(
          (work) => work.category.id === parseInt(filterValue)
        );
      }
      displayWorks(filteredWorks);
    });
  });
}

/**
 * Fonction qui éxécute les fonctions du JS
 */
async function init() {
  const works = await getWorks();
  displayWorks(works);

  const categories = await categoriesImport();
  // Création des bouttons dans le DOM
  createButtons();

  worksFilter();
}

init();
