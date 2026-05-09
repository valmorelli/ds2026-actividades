async function buscarLibros(consulta) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(consulta)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al buscar libros: ${response.status}`);
    }
    const data = await response.json();
    return data.docs;
}

function mostrarResultados(libros) {
    const res = document.getElementById('resultados');
    res.innerHTML = '';
    
    const array = libros.slice(0, 12); 
    
    array.forEach(libro => {
        const autor = libro.author_name ? libro.author_name.join(", ") : "Autor desconocido";
        
        const portadaUrl = libro.cover_i 
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg` 
            : 'https://via.placeholder.com/150x200?text=Sin+Portada';

        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${portadaUrl}" class="card-img-top" alt="${libro.title}" style="height: 350px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title"><strong>${libro.title}</strong></h5>
                    <p class="card-text text-muted"><em>Autor:</em> ${autor}</p>
                    <div class="mt-auto">
                        <a href="libro.html" class="btn btn-outline-primary w-100">Ver detalle</a>
                    </div>
                </div>
            </div>
        `;
        res.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('#boton');
    
    if (boton) {
        boton.addEventListener('click', async () => {
            const busqueda = document.querySelector('#buscar');
            const errorD = document.querySelector('#errorBusqueda');
            const carga = document.querySelector('#cargar');
            const r = document.querySelector('#resultados');
            
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
                if (rta.length === 0) {
                    errorD.innerText = "No se encontraron resultados.";
                    errorD.style.display = "block";
                } else {
                    mostrarResultados(rta);
                }
            }
            catch (error) {
                errorD.innerText = "Error al realizar la busqueda";
                errorD.style.display = "block";
            }
            finally {
                carga.style.display = "none";
            }
        });
    }
});