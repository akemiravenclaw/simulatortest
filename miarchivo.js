document.addEventListener("DOMContentLoaded", function() {
    const procesoSelector = document.getElementById("procesoSelector");
    const formularioDiv = document.getElementById("formulario");
    const resultadoDiv = document.getElementById("resultado");

    // Cargar y parsear el archivo JSON al cargar la página
    let libros = []; // Inicialmente, la lista de libros está vacía

    fetch("libros.json") // Reemplaza "libros.json" con la ruta correcta de tu archivo JSON
        .then(response => response.json())
        .then(data => {
            libros = data; // Almacena los datos del archivo JSON en la lista de libros
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));

    // Función para mostrar un mensaje en el resultado
    function mostrarMensaje(mensaje) {
        resultadoDiv.innerHTML = mensaje;
    }

    // Función para mostrar un resultado en el resultado
    function mostrarResultado(resultado) {
        resultadoDiv.innerHTML = resultado;
    }

    // Función para capturar entradas
    function capturarEntradas() {
        const cantidadLibros = parseFloat(prompt("Ingrese la cantidad de libros:"));
        const precioUnitario = parseFloat(prompt("Ingrese el precio unitario por libro:"));

        if (isNaN(cantidadLibros) || isNaN(precioUnitario)) {
            mostrarMensaje("Por favor, ingrese valores válidos.");
            return;
        }

        const costoTotal = cantidadLibros * precioUnitario;
        mostrarResultado(`El costo total es: $${costoTotal.toFixed(2)}`);
    }

    // Función para mostrar productos disponibles
    function verProductosDisponibles() {
        let productosDisponibles = "Productos disponibles:<br>";

        libros.forEach(libro => {
            productosDisponibles += `Nombre: ${libro.nombre}<br>Autor: ${libro.autor}<br>Precio: $${libro.precio.toFixed(2)}<br><br>`;
        });

        mostrarResultado(productosDisponibles);
    }

    // Manejar cambios en el selector de procesos
    procesoSelector.addEventListener("change", function() {
        const procesoSeleccionado = procesoSelector.value;
        formularioDiv.innerHTML = ""; // Limpia el formulario
        resultadoDiv.innerHTML = ""; // Limpia el resultado

        if (procesoSeleccionado === "capturarEntradas") {
            capturarEntradas();
        } else if (procesoSeleccionado === "verProductosDisponibles") {
            verProductosDisponibles();
        } else {
            mostrarMensaje("Proceso no implementado.");
        }
    });
});

