const palabras = document.querySelectorAll(".palabra");
const dataResp = document.querySelectorAll(".respuesta");
const parrafo = document.getElementById("parrafo");

const botonComprobar = document.getElementById("comprobar");
const feedback = document.getElementById("feedback");


let intentos = 2;
let palabrasCorrectas = 0;

//se agrega el dragstart y el dragend a el listado de palabras para que se dejen arrastrar

palabras.forEach(palabra =>{
    palabra.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData('text/plain', palabra.textContent);
        
    });
    palabra.addEventListener("dragend",(e)=>{
        palabra.classList.remove('green');
    });
});
// se agrega evento dragover al parrafo para que detecte cuando el mouse se ubica sobre el
parrafo.addEventListener("dragover",(e)=>{
    e.preventDefault();
});

// se agrega evento drop para que se agregue la palabra al parrafo junto con un condicional para que se agregue en el span contenedor, en el cual se especifica que si el contenedor tiene la clase palabra lo agregue y que adicional el contenido de dicho espacio este vacio.
parrafo.addEventListener("drop",(e)=>{
    e.preventDefault();
    const palabraArrastrada = e.dataTransfer.getData('text/plain');
        const casillaVacia = e.target;

        if (casillaVacia.classList.contains('palabra') && !casillaVacia.textContent.trim()) {
            casillaVacia.textContent = palabraArrastrada;
        }
});
// se agrega un evento click al parrafo, para que cuando le den click a las palabras que se arrastraron, se quiten y permita hacer modificaciones
parrafo.addEventListener('click', (e) => {
    const palabraClic = e.target;
    if (palabraClic.classList.contains('palabra') && palabraClic.textContent.trim() !== '') {
        palabraClic.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', palabraClic.textContent);
        });
        palabraClic.textContent = '';
    }
});
// se crea evento en el boton para que haga la validacion de respuestas correctas las cuales estan almacenadas en el parrafo con la clase respuesta y si estan bien se agrega el estilo con backgroundColor verde; con el contador se valida si la cantidad de palabras correctas es igual al numero de respuestas correctas y dependiendo el resultado se hace el feedback
botonComprobar.addEventListener('click',() => {
    palabrasCorrectas = 0;

    dataResp.forEach(dataResp => {
        const correcto = dataResp.getAttribute('respuesta');
        console.log(correcto);
        if(dataResp.textContent.trim() === correcto){
            dataResp.style.backgroundColor = 'rgb(42, 163, 42)';
            palabrasCorrectas++;
        }
     });
     if (palabrasCorrectas === dataResp.length) {
        feedback.textContent = '¡Felicitaciones! Haz logrado organizar correctamente cada uno de los términos y así recordar la definición de la arquitectura multiprocesador. Sigue estudiando para ser cada vez mejor.';
        botonComprobar.disabled = true;
     } else {
        intentos--;
        if (intentos > 0) {
            feedback.textContent = `Retroalimentación incorrecta: Estudia una vez más la arquitectura procesador e inténtalo de nuevo. Te quedan ${intentos} intentos.`;
        } else {
            feedback.textContent = 'Se acabaron los intentos. Inténtalo de nuevo más tarde.';
            botonComprobar.disabled = true;
        }
     }
});