// Variables
const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");
/**
* Div .filter-container
*/
const filterContainer = document.querySelector('.filter-container');


/**
 * Fonction qui retourne le tableau works
 */
async function getWorks() {
    return await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
}

/**
 * Fonction qui retourne les Catégories
 */
async function categoriesImport() {
    return await fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
}

/**
 * Fonction qui reset la gallery
 */
function resetDisplayGallery(){
    gallery.innerHTML = "";
}

/**
 * Fonction qui créer les Works de la gallery
 */
function displayWork(work){
        /*
        const figure = document.createElement("figure");
        gallery.appendChild(figure);
        figure.classList = work.category.name;
        figure.setAttribute("data-id", work.id);

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = work.title;
        figure.appendChild(figcaption);
        */
        const figure = document.createElement('figure')
        figure.classList = work.category.name;
        figure.setAttribute("data-id", work.id);
 
        figure.innerHTML = `
         <img src="${work.imageUrl}" alt="${work.title}" />
         <figcaption>${work.title}</figcaption>
        `
 
        gallery.appendChild(figure);
}

/**
 * Fonction qui génére les works
 */
function displayWorks(worksArray) {

    // Réinitialise l'affichage de gallery
    resetDisplayGallery()

    // Ajout des projets dans gallery
    worksArray.forEach((work) => {
        displayWork(work)
    });
}

/**
 * Boutons des filtres
 */
const buttonData = [
    { id: -1, text: 'Tous' },
    { id: 1, text: 'Objets' },
    { id: 2, text: 'Appartements' },
    { id: 3, text: 'Hotels & restaurants' }
  ];
  
  /**
   * Fonction qui créer les boutons des filtres
   */
  function createButtons() {
    buttonData.forEach(data => {
      const button = document.createElement('button');
      button.className = 'filter';
      button.setAttribute('data-id', data.id);
      button.textContent = data.text;
      filterContainer.appendChild(button);
    });
  }
  
 /**
  * Fonction qui géres les filtres
  */
  function worksFilter() {
    const filters = document.querySelectorAll('.filter');
  
    filters.forEach(filter => {
      filter.addEventListener('click', async () => {
        const filterValue = filter.getAttribute('data-id');
            const works = await getWorks();
            let filteredWorks = [];

            if (filterValue === "-1") {
                filteredWorks = works;
            } else {
                filteredWorks = works.filter( 
                    (work) => work.category.id === parseInt(filterValue)
                );
            }
        displayWorks(filteredWorks);
      });
    });
  }




  // Condition si utilisateur connecté
  


/**
 * Fonction qui éxécute les fonctions du JS
 */
async function init (){

    const works = await getWorks();
    displayWorks(works);

    
    const categories = await categoriesImport();
    // Création des bouttons dans le DOM
    createButtons();

    worksFilter();
}

init()


