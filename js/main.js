let saldo = 10000;
let continuar = true;

while (continuar) {

    let opcion = prompt(
        "SIMULADOR BANCARIO\n\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Salir\n\n" +
        "Seleccioná una opción:"
    );

    if (opcion === "1") {

        alert("Tu saldo actual es: $" + saldo);
        console.log("Consulta de saldo. Saldo actual: $" + saldo);

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

        } else if (retiro > saldo) {

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

    } else {

        alert("Opción no válida. Intentá nuevamente.");
        console.log("Error: opción no válida.");
    }
}