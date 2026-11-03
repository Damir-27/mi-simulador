
let saldo = 10000;
let continuar = true;

// ARRAY: historial inicial con 5 movimientos
const historialMovimientos = [
    "Depósito inicial: $10000",
    "Consulta de saldo",
    "Depósito: $2000",
    "Retiro: $500",
    "Consulta de saldo"
];

// UNSHIFT: agrega un movimiento al principio del array
historialMovimientos.unshift("Inicio del simulador bancario");

// FUNCIÓN: recorrer y mostrar el historial
function mostrarHistorial(movimientos) {

    console.log("--- HISTORIAL DE MOVIMIENTOS ---");

    // FOR...OF: recorre todos los elementos del array
    for (let movimiento of movimientos) {
        console.log("Movimiento: " + movimiento);
    }
}

// CICLO PRINCIPAL DEL SIMULADOR
while (continuar) {

    let opcion = prompt(
        "SIMULADOR BANCARIO\n\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Salir\n" +
        "5 - Consultar historial\n" +
        "6 - Buscar movimiento\n" +
        "7 - Modificar movimiento\n" +
        "8 - Eliminar último movimiento\n\n" +
        "Seleccioná una opción:"
    );

    if (opcion === "1") {

        alert("Tu saldo actual es: $" + saldo);

        console.log("Consulta de saldo. Saldo actual: $" + saldo);

        // PUSH: agrega el movimiento al final
        historialMovimientos.push("Consulta de saldo");

    } else if (opcion === "2") {

        let deposito = Number(
            prompt("Ingresá el monto que querés depositar:")
        );

        if (deposito > 0) {

            saldo += deposito;

            alert(
                "Depósito realizado correctamente.\n" +
                "Nuevo saldo: $" + saldo
            );

            console.log(
                "Depósito realizado: $" + deposito +
                ". Nuevo saldo: $" + saldo
            );

            historialMovimientos.push("Depósito: $" + deposito);

        } else {

            alert("El monto ingresado no es válido.");
            console.log("Error: el monto del depósito no es válido.");
        }

    } else if (opcion === "3") {

        let retiro = Number(
            prompt("Ingresá el monto que querés retirar:")
        );

        if (retiro > 0 && retiro <= saldo) {

            saldo -= retiro;

            alert(
                "Retiro realizado correctamente.\n" +
                "Nuevo saldo: $" + saldo
            );

            console.log(
                "Retiro realizado: $" + retiro +
                ". Nuevo saldo: $" + saldo
            );

            historialMovimientos.push("Retiro: $" + retiro);

        } else if (retiro > saldo && retiro > 0) {

            alert("Fondos insuficientes.");

            console.log(
                "Error: fondos insuficientes para retirar $" + retiro
            );

        } else {

            alert("El monto ingresado no es válido.");
            console.log("Error: el monto del retiro no es válido.");
        }

    } else if (opcion === "4") {

        alert("Gracias por utilizar el simulador bancario.");
        console.log("Simulador bancario finalizado.");

        continuar = false;

    } else if (opcion === "5") {

        // FUNCIÓN: muestra todos los movimientos
        mostrarHistorial(historialMovimientos);

        alert("El historial de movimientos fue mostrado en consola.");

    } else if (opcion === "6") {

        // INCLUDES: verifica si existe el movimiento
        let busqueda = prompt(
            "Ingresá el movimiento que querés buscar:"
        );

        if (historialMovimientos.includes(busqueda)) {

            // INDEXOF: obtiene la posición del movimiento
            let indice = historialMovimientos.indexOf(busqueda);

            alert(
                "Movimiento encontrado.\n" +
                "Posición en el historial: " + indice
            );

            console.log(
                "Movimiento encontrado: " + busqueda +
                ". Índice: " + indice
            );

        } else {

            alert("El movimiento no existe en el historial.");
            console.log("Movimiento no encontrado.");
        }

    } else if (opcion === "7") {

        // SPLICE: reemplaza un elemento en un índice específico
        let indice = 2;

        if (historialMovimientos.length > indice) {

            let nuevoMovimiento = prompt(
                "Ingresá la descripción del nuevo movimiento:"
            );

            if (nuevoMovimiento !== null && nuevoMovimiento.trim() !== "") {

                let movimientoAnterior = historialMovimientos[indice];

                historialMovimientos.splice(
                    indice,
                    1,
                    nuevoMovimiento
                );

                alert(
                    "Movimiento modificado correctamente.\n" +
                    "Anterior: " + movimientoAnterior +
                    "\nNuevo: " + nuevoMovimiento
                );

                console.log(
                    "Movimiento actualizado en el índice " + indice
                );

            } else {

                alert("La descripción no puede estar vacía.");
            }

        } else {

            alert("No hay un movimiento disponible en ese índice.");
        }

    } else if (opcion === "8") {

        // POP: elimina el último elemento y lo guarda en una variable
        if (historialMovimientos.length > 0) {

            let eliminado = historialMovimientos.pop();

            alert("Se ha eliminado el elemento: " + eliminado);

            console.log("Movimiento eliminado: " + eliminado);

        } else {

            alert("El historial está vacío.");
            console.log("No hay movimientos para eliminar.");
        }

    } else {

        alert("Opción no válida. Intentá nuevamente.");
        console.log("Error: opción no válida.");
    }
}
