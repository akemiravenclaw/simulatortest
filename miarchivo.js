document.addEventListener("DOMContentLoaded", function() {
    const procesoSelector = document.getElementById("procesoSelector");
    const formularioDiv = document.getElementById("formulario");
    const resultadoDiv = document.getElementById("resultado");
    
    procesoSelector.addEventListener("change", function() {
        const procesoSeleccionado = procesoSelector.value;
        formularioDiv.innerHTML = ""; // funciona para limpiar el formulario
        resultadoDiv.innerHTML = ""; // funciona para limpiar el resultado
        
        if (procesoSeleccionado === "calcularCosto") {
            formularioDiv.innerHTML = `
                <label for="cantidadProductos">Cantidad de productos:</label>
                <input type="number" id="cantidadProductos" step="1" min="0">
                <br>
                <label for="precioUnitario">Precio unitario:</label>
                <input type="number" id="precioUnitario" step="0.01" min="0">
                <br>
                <button id="calcularCostoBtn">Calcular Costo</button>
            `;
            
            const calcularCostoBtn = document.getElementById("calcularCostoBtn");
            calcularCostoBtn.addEventListener("click", function() {
                const cantidadProductos = parseFloat(document.getElementById("cantidadProductos").value);
                const precioUnitario = parseFloat(document.getElementById("precioUnitario").value);
                if (isNaN(cantidadProductos) || isNaN(precioUnitario)) {
                    resultadoDiv.innerHTML = "Por favor, ingrese valores válidos.";
                    return;
                }
                const costoTotal = cantidadProductos * precioUnitario;
                resultadoDiv.innerHTML = `El costo total es: $${costoTotal.toFixed(2)}`;
            });
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
                const montoTotal = parseFloat(document.getElementById("montoTotal").value);
                const cuotas = parseInt(document.getElementById("cuotas").value);
                if (isNaN(montoTotal) || isNaN(cuotas)) {
                    resultadoDiv.innerHTML = "Por favor, ingrese valores válidos.";
                    return;
                }
                const pagoPorCuota = montoTotal / cuotas;
                resultadoDiv.innerHTML = `Pago por cuota: $${pagoPorCuota.toFixed(2)}`;
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
            });
        } else {
            // Manejar otros procesos
            formularioDiv.innerHTML = `Proceso no implementado.`;
        }
    });
});
