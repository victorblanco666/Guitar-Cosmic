
const searchInput = document.getElementById('searchInput');
const sheetContainer = document.getElementById('sheetContainer');


//funcion para verificar si esta buscando una cancion o los album a traves del cantante
function searchSong() {
const searchTerm = searchInput.value;
const isArtist = searchTerm.toLowerCase().startsWith('artista:');
if (isArtist) {
    const artistName = searchTerm.substring(7).trim();
    searchByArtist(artistName);
} else {
    searchBySong(searchTerm);
}
}


//funcion al buscar album 
function searchByArtist(artistName) {
$.ajax({
    url: `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=9ef7678a65f86f361a9fea414e2a132a&format=json`,
    method: 'GET',
    success: function (response) {
    if (response.topalbums && response.topalbums.album && response.topalbums.album.length > 0) {
        let albumsHTML = '';
        for (let i = 0; i < response.topalbums.album.length; i++) {
        const album = response.topalbums.album[i];
        const albumName = album.name;
        const albumImage = album.image[2]['#text'];
        const albumDescription = album.artist ? album.artist.name : 'Artista desconocido';
        albumsHTML += `
            <div>
            <h2>${albumName}</h2>
            <img src="${albumImage}" alt="Portada del álbum">
            <p>Artista: ${albumDescription}</p>
            <button class="albumButton" data-album="${albumName}">Mostrar canciones</button>
            </div>`;
        }

        sheetContainer.innerHTML = albumsHTML;

        // Agregar a los botones de álbum
        const albumButtons = document.getElementsByClassName('albumButton');
        for (let i = 0; i < albumButtons.length; i++) {
        albumButtons[i].addEventListener('click', function () {
            const albumName = this.getAttribute('data-album');
            showSongs(albumName);
        });
        }
    } else {
        sheetContainer.innerHTML = 'No se encontraron álbumes para el artista especificado.';
    }
    },
    error: function () {
    sheetContainer.innerHTML = 'Error al realizar la búsqueda del artista.';
    }
});
}
//funcion al buscar cancion directamente
function searchBySong(songTitle) {
$.ajax({
    url: `https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(songTitle)}`,
    method: 'GET',
    success: function (response) {
    if (response.length > 0) {
        const song = response[0]; // Tomar la primera canción 
        const songTitle = song.title;
        const artistName = song.artist.name;
        const songUrl = `https://www.songsterr.com/a/wa/bestMatchForQueryString?s=${encodeURIComponent(songTitle)}&a=${encodeURIComponent(artistName)}`;

        // Realizar solicitud a la API de Last.fm para obtener la portada de la canción
        $.ajax({
        url: `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(songTitle)}&artist=${encodeURIComponent(artistName)}&api_key=9ef7678a65f86f361a9fea414e2a132a&format=json`,
        method: 'GET',
        success: function (response) {
        if (response.track && response.track.album && response.track.album.image && response.track.album.image.length > 0) {
        const trackImage = response.track.album.image[2]['#text'];
        const trackDescription = response.track.album.artist ? response.track.album.artist : 'Artista desconocido';
                    // Construir la estructura HTML de la canción y la portada
                    const songHTML = `
                    <h2>${songTitle}</h2>
                    <h3>Artista: ${artistName}</h3>
                    <img src="${trackImage}" alt="Portada de la canción">
                    <p>Artista: ${trackDescription}</p>
                    <p><a href="${songUrl}" target="_blank">Ver partitura en Songsterr</a></p>
                `;
        
                sheetContainer.innerHTML = songHTML;
                } else {
                sheetContainer.innerHTML = 'No se encontró la canción o la portada.';
                }
            },
            error: function () {
                sheetContainer.innerHTML = 'Error al obtener la información de la canción.';
            }
            });
        } else {
            sheetContainer.innerHTML = 'No se encontró la canción.';
        }
        },
        error: function () {
        sheetContainer.innerHTML = 'Error al realizar la búsqueda de la canción.';
        }
    });
}

//funcion al precionar el album buscar las canciones
function showSongs(albumName) {
$.ajax({
url: 'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&album=${encodeURIComponent(albumName)}&api_key=9ef7678a65f86f361a9fea414e2a132a&format=json',
method: 'GET',
success: function (response) {
if (response.album && response.album.tracks && response.album.tracks.track && response.album.tracks.track.length > 0) {
let songsHTML = '';
    // Construir la lista de canciones del álbum
    for (let i = 0; i < response.album.tracks.track.length; i++) {
        const track = response.album.tracks.track[i];
        const songTitle = track.name;
        const songArtist = track.artist.name;

        songsHTML += `
        <div>
            <h2>${songTitle}</h2>
            <p>Artista: ${songArtist}</p>
        </div>`;
    }

    sheetContainer.innerHTML = songsHTML;
    } else {
    sheetContainer.innerHTML = 'No se encontraron canciones para el álbum especificado.';
    }
},
error: function () {
    sheetContainer.innerHTML = 'Error al obtener las canciones del álbum.';
}
});
}