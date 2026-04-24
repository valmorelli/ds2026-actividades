"use strict";
const input = document.querySelector('#inputAltura');
const boton = document.querySelector('#btnGenerar');
const pantalla = document.querySelector('#contenedorArbol');
boton.addEventListener('click', () => {
    const altura = parseInt(input.value);
    if (isNaN(altura) || altura < 1) {
        pantalla.innerHTML = "<b>ERROR:</b> ingresar un num mayor o igual a 1";
        pantalla.style.color = "red";
        return;
    }
    pantalla.style.color = "black";
    let dibujoArbol = "";
    for (let i = 1; i <= altura; i++) {
        dibujoArbol += generarAsteriscos(i) + "\n";
    }
    pantalla.innerText = dibujoArbol;
});
function generarAsteriscos(n) {
    let asteriscos = "";
    for (let i = 0; i < n; i++) {
        asteriscos += "*";
    }
    return asteriscos;
}
