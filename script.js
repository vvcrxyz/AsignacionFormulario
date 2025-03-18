document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");
    const tabla = document.getElementById("tabla-jugadores").querySelector("tbody");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        // Capturamos los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const numero = document.getElementById("numero").value;
        const posicion = document.getElementById("posicion").value;
        const bateo = document.querySelector('input[name="bateo"]:checked')?.value;
        const lanzamiento = document.querySelector('input[name="lanzamiento"]:checked')?.value;

        if (!nombre || !edad || !fechaNacimiento || !numero || !posicion || !bateo || !lanzamiento) {
            alert("Todos los campos son obligatorios");
            return;
        }

        // Agregar jugador a la tabla
        agregarFila(nombre, edad, fechaNacimiento, numero, posicion, bateo, lanzamiento);

        // Limpiar formulario
        formulario.reset();
    });

    function agregarFila(nombre, edad, fechaNacimiento, numero, posicion, bateo, lanzamiento) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${edad}</td>
            <td>${fechaNacimiento}</td>
            <td>${numero}</td>
            <td>${posicion}</td>
            <td>${bateo}</td>
            <td>${lanzamiento}</td>
            <td>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </td>
        `;

        // Boton para eliminar
        fila.querySelector(".eliminar").addEventListener("click", function () {
            fila.remove();
        });

        // Boton para editar
        fila.querySelector(".editar").addEventListener("click", function () {
            editarFila(fila);
        });

        tabla.appendChild(fila);
    }

    function editarFila(fila) {
        const celdas = fila.querySelectorAll("td");

        document.getElementById("nombre").value = celdas[0].innerText;
        document.getElementById("edad").value = celdas[1].innerText;
        document.getElementById("fechaNacimiento").value = celdas[2].innerText;
        document.getElementById("numero").value = celdas[3].innerText;
        document.getElementById("posicion").value = celdas[4].innerText;

        document.querySelector(`input[name="bateo"][value="${celdas[5].innerText}"]`).checked = true;
        document.querySelector(`input[name="lanzamiento"][value="${celdas[6].innerText}"]`).checked = true;

        fila.remove(); // Esto elimina la fila para evitar duplicidad
    }
});
