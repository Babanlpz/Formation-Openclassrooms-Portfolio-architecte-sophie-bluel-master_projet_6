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




// Données pour les boutons
const buttonData = [
    { id: -1, text: 'Tous' },
    { id: 1, text: 'Objets' },
    { id: 2, text: 'Appartements' },
    { id: 3, text: 'Hotels & restaurants' }
  ];

// Sélectionner le conteneur
const filterContainer = document.querySelector('.filter-container');

// Créer et ajouter les boutons au conteneur
function btnLogin() {

    buttonData.forEach((data) => {
        const button = document.createElement('button');
        button.className = 'filter';
        button.setAttribute('data-id', data.id);
        button.textContent = data.text;
        filterContainer.appendChild(button);
      });
}


/**
 * Fonction qui gére les filtres
 */
function worksFilter() {
    filters.forEach((filter) => {

        /**
         * Au click sur un boutton de filtre
         */
        filter.addEventListener("click", async () => {
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