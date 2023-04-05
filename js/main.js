// Obtenemos el botón y el contenedor de búsqueda
var btnSearch = document.getElementById("btn-search");
var searchContainer = document.getElementById("search-container");

// Agregamos un event listener para detectar el click en el botón
btnSearch.addEventListener("click", function() {
// Alternamos la clase "show" del contenedor de búsqueda para mostrar u ocultar la barra
searchContainer.classList.toggle("show");
});



