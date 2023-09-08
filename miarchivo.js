document.addEventListener("DOMContentLoaded", function() {
    const procesoSelector = document.getElementById("procesoSelector");
    const formularioDiv = document.getElementById("formulario");
    const resultadoDiv = document.getElementById("resultado");

    // Función para capturar entradas mediante prompt()
    function capturarEntradas() {
        const cantidadLibros = parseFloat(prompt("Ingrese la cantidad de libros:"));
        const precioUnitario = parseFloat(prompt("Ingrese el precio unitario por libro:"));
        if (isNaN(cantidadLibros) || isNaN(precioUnitario)) {
            resultadoDiv.innerHTML = "Por favor, ingrese valores válidos.";
            return;
        }
        const costoTotal = cantidadLibros * precioUnitario;
        resultadoDiv.innerHTML = `El costo total es: $${costoTotal.toFixed(2)}`;
    }

    // Función para calcular pagos en cuotas
    function calcularCuotas() {
        const montoTotal = parseFloat(document.getElementById("montoTotal").value);
        const cuotas = parseInt(document.getElementById("cuotas").value);
        if (isNaN(montoTotal) || isNaN(cuotas)) {
            resultadoDiv.innerHTML = "Por favor, ingrese valores válidos.";
            return;
        }
        const pagoPorCuota = montoTotal / cuotas;
        resultadoDiv.innerHTML = `Pago por cuota: $${pagoPorCuota.toFixed(2)}`;
    }

    // Función para calcular el valor final
    function calcularValorFinal() {
        const valorInicial = parseFloat(document.getElementById("valorInicial").value);
        const impuestos = parseFloat(document.getElementById("impuestos").value);
        const descuentos = parseFloat(document.getElementById("descuentos").value);
        if (isNaN(valorInicial) || isNaN(impuestos) || isNaN(descuentos)) {
            resultadoDiv.innerHTML = "Por favor, ingrese valores válidos.";
            return;
        }
        const impuestosAmount = (impuestos / 100) * valorInicial;
        const descuentosAmount = (descuentos / 100) * valorInicial;
        const valorFinal = valorInicial + impuestosAmount - descuentosAmount;
        resultadoDiv.innerHTML = `Valor final: $${valorFinal.toFixed(2)}`;
    }

    // Lista de libros
    const libros = [
        {
            nombre: "Herejes De Dune (Dune 5)",
            autor: "FRANK HERBERT",
            precio: 15.99,
        },
        {
            nombre: "Ocho horas para enamorarse",
            autor: "LIA LOUIS",
            precio: 12.49,
        },
        {
            nombre: "La Chica No Olvida",
            autor: "IRENE X",
            precio: 18.99,
        },
        // Agregar más libros en el futuro
    ];

    // Función para buscar un libro por nombre y mostrar su información
    function buscarLibroPorNombre(nombre) {
        const libroEncontrado = libros.find(libro => libro.nombre.toLowerCase() === nombre.toLowerCase());
        if (libroEncontrado) {
            resultadoDiv.innerHTML = `Nombre: ${libroEncontrado.nombre}<br>Autor: ${libroEncontrado.autor}<br>Precio: $${libroEncontrado.precio.toFixed(2)}`;
        } else {
            resultadoDiv.innerHTML = "Libro no encontrado.";
        }
    }

    // Función para filtrar libros por precio
    function filtrarLibrosPorPrecio(precioMaximo) {
        const librosFiltrados = libros.filter(libro => libro.precio <= precioMaximo);
        if (librosFiltrados.length > 0) {
            resultadoDiv.innerHTML = "Libros encontrados:<br>";
            librosFiltrados.forEach(libro => {
                resultadoDiv.innerHTML += `${libro.nombre} - Autor: ${libro.autor} - Precio: $${libro.precio.toFixed(2)}<br>`;
            });
        } else {
            resultadoDiv.innerHTML = "No se encontraron libros dentro del precio máximo.";
        }
    }

    // Función para mostrar todos los productos disponibles
    function mostrarProductosDisponibles() {
        resultadoDiv.innerHTML = "Productos disponibles:<br>";
        libros.forEach(libro => {
            resultadoDiv.innerHTML += `${libro.nombre} - Autor: ${libro.autor} - Precio: $${libro.precio.toFixed(2)}<br>`;
        });
    }

    // Manejar cambios en el selector de procesos
    procesoSelector.addEventListener("change", function() {
        const procesoSeleccionado = procesoSelector.value;
        formularioDiv.innerHTML = ""; // Funciona para limpiar el formulario
        resultadoDiv.innerHTML = ""; // Funciona para limpiar el resultado

        if (procesoSeleccionado === "capturarEntradas") {
            capturarEntradas();
        } else if (procesoSeleccionado === "calcularCuotas") {
            formularioDiv.innerHTML = `
                <label for="montoTotal">Monto total:</label>
                <input type="number" id="montoTotal" step="0.01" min="0">
                <br>
                <label for="cuotas">Cantidad de cuotas:</label>
                <input type="number" id="cuotas" step="1" min="1">
                <br>
                <button id="calcularCuotasBtn">Calcular Cuotas</button>
            `;
            const calcularCuotasBtn = document.getElementById("calcularCuotasBtn");
            calcularCuotasBtn.addEventListener("click", function() {
                calcularCuotas(); // Llamando a la función para calcular pagos en cuotas
            });
        } else if (procesoSeleccionado === "calcularValorFinal") {
            formularioDiv.innerHTML = `
                <label for="valorInicial">Valor inicial:</label>
                <input type="number" id="valorInicial" step="0.01" min="0">
                <br>
                <label for="impuestos">Impuestos (%):</label>
                <input type="number" id="impuestos" step="0.01" min="0">
                <br>
                <label for="descuentos">Descuentos (%):</label>
                <input type="number" id="descuentos" step="0.01" min="0">
                <br>
                <button id="calcularValorFinalBtn">Calcular Valor Final</button>
            `;
            const calcularValorFinalBtn = document.getElementById("calcularValorFinalBtn");
            calcularValorFinalBtn.addEventListener("click", function() {
                calcularValorFinal(); // Llamando a la función para calcular el valor final
            });
        } else if (procesoSeleccionado === "buscarProducto") {
            formularioDiv.innerHTML = `
                <label for="nombreLibro">Nombre del libro:</label>
                <input type="text" id="nombreLibro">
                <br>
                <button id="buscarLibroBtn">Buscar Libro</button>
            `;
            const buscarLibroBtn = document.getElementById("buscarLibroBtn");
            buscarLibroBtn.addEventListener("click", function() {
                const nombreLibro = document.getElementById("nombreLibro").value;
                buscarLibroPorNombre(nombreLibro); // Llamando a la función para buscar un libro por nombre
            });
        } else if (procesoSeleccionado === "filtrarProductos") {
            formularioDiv.innerHTML = `
                <label for="precioMaximo">Precio máximo:</label>
                <input type="number" id="precioMaximo" step="0.01" min="0">
                <br>
                <button id="filtrarLibrosBtn">Filtrar Libros</button>
            `;
            const filtrarLibrosBtn = document.getElementById("filtrarLibrosBtn");
            filtrarLibrosBtn.addEventListener("click", function() {
                const precioMaximo = parseFloat(document.getElementById("precioMaximo").value);
                if (!isNaN(precioMaximo)) {
                    filtrarLibrosPorPrecio(precioMaximo); // Llamando a la función para filtrar libros por precio
                } else {
                    resultadoDiv.innerHTML = "Por favor, ingrese un precio máximo válido.";
                }
            });
        } else if (procesoSeleccionado === "verProductosDisponibles") {
            mostrarProductosDisponibles(); // Llamando a la función para mostrar todos los productos disponibles
        } else {
            formularioDiv.innerHTML = `Proceso no implementado.`;
        }
    });
});
