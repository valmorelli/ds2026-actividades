interface LibroOl {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}


async function buscarLibros(consulta: string): Promise<LibroOl[]> {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(consulta)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al buscar libros: ${response.status}`);
    }

    const data = await response.json();
    return data.docs;
}

function mostrarResultados(libros: LibroOl[]) {
    const res = document.getElementById('resultados') as HTMLElement;
    res.innerHTML = '';

    const array = libros.slice(0, 10);
    array.forEach(libro => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        const autor = libro.author_name ? libro.author_name.join(", ") : "Autor desconocido";
        const anio = libro.first_publish_year ? libro.first_publish_year : "Sin año";

        tarjeta.innerHTML = `
            <h2>${libro.title}</h2>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Año de publicación:</strong> ${anio}</p>
        `;
        res.appendChild(tarjeta);
    });
}

document.querySelector('#boton')?.addEventListener('click', async () => {
    const busqueda = document.querySelector('#buscar') as HTMLInputElement;
    const errorD = document.querySelector('#errorBusqueda') as HTMLElement;
    const carga = document.querySelector('#cargar') as HTMLElement;
    const r = document.querySelector('#resultados') as HTMLElement;

    r.innerHTML = "";
    errorD.style.display = "none";
    errorD.innerText = "";
    
    if (busqueda.value.trim() === "") {
        errorD.innerText = "Error: ingrese un libro para buscar";
        errorD.style.display = "block";
        return; 
    }

    
    carga.style.display = "block";

    try {
        const rta = await buscarLibros(busqueda.value.trim());
        mostrarResultados(rta);
    } catch (error) {
        errorD.innerText = "Error al realizar la bsuqueda";
        errorD.style.display = "block";
    } finally {
        carga.style.display = "none";
    }
});