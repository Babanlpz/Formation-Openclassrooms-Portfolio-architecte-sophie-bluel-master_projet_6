// Variables
const gallery = document.querySelector(".gallery");
const filters = document.querySelectorAll(".filter");

let works = [];
let categories = [];

/**
 * Fonction qui retourne le tableau works
 */
async function getWorks() {
    return await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            works = data;
        });
}

/**
 * Fonction qui retourne les Catégories
 */
async function categoriesImport() {
    return await fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((data) => {
            categories = data;
        });
}

/**
 * 
 */
function resetDisplayGallery(){
    gallery.innerHTML = "";
}

/**
 * 
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
 * Fonction qui gére les filtres
 */
function worksFilter() {
    filters.forEach((filter) => {
        const filterValue = filter.textContent;

        filter.addEventListener("click", () => {
            let filteredWorks = [];
            if (filterValue === "Tous") {
                filteredWorks = works;
            } else {
                filteredWorks = works.filter( 
                    (work) => work.category.name === filterValue
                );
            }
            displayWorks(filteredWorks);
        });
    });
}


/**
 * 
 */
async function init (){

    await getWorks();
    displayWorks(works);

    
    categoriesImport();

    worksFilter();
}

init()


