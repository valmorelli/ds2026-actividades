const input =document.querySelector('#producto');
const boton = document.querySelector('#boton');
const listaContenedor = document.querySelector('#lista');
const contador = document.querySelector('#cont');
let cantidad = 0;

const actualizarContador = () => {
    contador.innerText = `${cantidad} productos en lista`;
};

boton.addEventListener('click', () => {
    const texto = input.value.trim();

    if (texto === "") {
        alert("ingresá un nombre para el producto.");
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${texto}</span>
        <button class="btn-borrar">Eliminar</button>
    `;

    li.querySelector('.btn-borrar').addEventListener('click', () => {
        li.remove();
        cantidad--;
        actualizarContador();
    });

    listaContenedor.appendChild(li);
    cantidad++;
    actualizarContador();

    input.value = "";
});