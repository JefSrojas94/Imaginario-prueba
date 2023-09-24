let player;
let preguntaMostrada = false;

// Esta función se llama cuando se carga la API de YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'VhYcxrCUwZM', // id obtenido con la API en json
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Esta función se ejecuta cuando el video esta listo
function onPlayerReady(event) {
  // Inicia la reproducción del video
  event.target.playVideo();
}

// Esta función se ejecuta cuando cambia el estado del reproductor

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PAUSED && !preguntaMostrada && player.getCurrentTime() >= 2) {
        
        player.pauseVideo(); // Pausa el video
        preguntaMostrada = true; 

        //llama funcion para mostrar la pregunta
        mostrarPregunta();
    }
}

function mostrarPregunta() {
    const pregunta = '¿como se llama la empresa?';
    const opciones = ['Sweet Shop', 'Dulce Tentacion', 'Ponques', 'Empanadas'];

    const respuestaCorrecta = 'Dulce Tentacion'; 

    const respuesta = window.prompt(pregunta + '\n\nOpciones:\n\n' + opciones.join('\n'));

    if (respuesta === respuestaCorrecta) {
        // continúa la reproducción del video
        player.playVideo();
    } else {
        // muestra un mensaje de error
        alert('Respuesta incorrecta. El video se detendrá.');
        player.stopVideo();
    }
}