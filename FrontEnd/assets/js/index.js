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

// Récupérer dynamiquement les categories de l'architecture.

// Récupération des catégories de l'API (fetch GET)
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => displayCategory(categories))
  .catch((error) => {
    alert(`Erreur :` + error);
  });

function displayCategory(categories) {
  // Création de l'élément du Dom qui accueillera les filtres
  const sectionFiltres = document.querySelector(".filtres");

  // Création du bouton Tous
  const buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  buttonAll.classList.add("btnFilter");
  sectionFiltres.appendChild(buttonAll);

  // Mise en place de la class active sur le premier bouton
  let firstButtonsSelected = document.querySelector(".btnFilter");
  firstButtonsSelected.classList.add("active");

  // Appel des travaux via le bouton Tous
  buttonAll.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = "";
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((works) => displayWorks(works))
      .catch((error) => {
        alert(`Erreur :` + error);
      });
    setActiveButton(buttonAll);
  });

  for (let index = 0; index < categories.length; index++) {
    const categoryIndex = categories[index];

    // Création d'une balise dédiée à un bouton filtre de la gallerie
    const categoryElement = document.createElement("button");
    categoryElement.classList.add("btnFilter");
    categoryElement.innerHTML = categoryIndex.name;

    // Lien entre la balise input et la section filtre
    sectionFiltres.appendChild(categoryElement);

    // Affichage des travaux selon bouton cliqué
    categoryElement.addEventListener("click", (event) => {
      event.preventDefault();
      selectCategory(categoryIndex.id);
      setActiveButton(categoryElement);
    });
  }
}

// Fonction qui permet de sélectionner le bouton sur lequel on clique
function setActiveButton(button) {
  const buttons = document.querySelectorAll(".btnFilter");
  buttons.forEach((btn) => {
    if (btn === button) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Fonction qui permet le tri des catégories
function selectCategory(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      const selectWorks = works.filter(
        (works) => works.categoryId === categoryId
      );
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
      displayWorks(selectWorks);
    })
    .catch((error) => {
      alert(`Erreur :` + error);
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
