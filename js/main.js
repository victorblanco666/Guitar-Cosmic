// Obtenemos el botón y el contenedor de búsqueda
var btnSearch = document.getElementById("btn-search");
var searchContainer = document.getElementById("search-container");

// Agregamos un event listener para detectar el click en el botón
btnSearch.addEventListener("click", function() {
// Alternamos la clase "show" del contenedor de búsqueda para mostrar u ocultar la barra
searchContainer.classList.toggle("show");
});

let hideText_btn = document.getElementById('hideText_btn')

let hideText = document.getElementById('hideText')

hideText_btn.addEventListener('click',toggleText)

function toggleText() {
    hideText.classList.toggle('show')

    if(hideText.classList.contains('show')) {
        hideText_btn.innerHTML = '- Info'
    }
    else {
        hideText_btn.innerHTML = '+ Info'
    }
}

let hideText_btn2 = document.getElementById('hideText_btn2')

let hideText2 = document.getElementById('hideText2')

hideText_btn2.addEventListener('click',toggleText2)

function toggleText2() {
    hideText2.classList.toggle('show')

    if(hideText2.classList.contains('show')) {
        hideText_btn2.innerHTML = '- Info'
    }
    else {
        hideText_btn2.innerHTML = '+ Info'
    }
}

let hideText_btn3 = document.getElementById('hideText_btn3')

let hideText3 = document.getElementById('hideText3')

hideText_btn3.addEventListener('click',toggleText3)

function toggleText3() {
    hideText3.classList.toggle('show')

    if(hideText3.classList.contains('show')) {
        hideText_btn3.innerHTML = '- Info'
    }
    else {
        hideText_btn3.innerHTML = '+ Info'
    }
}