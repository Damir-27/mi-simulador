
// ==========================================
// 1. CLASE CUENTA BANCARIA
// ==========================================

class CuentaBancaria {

    constructor(titular, numeroCuenta, tipoCuenta, saldo) {

        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
        this.historialMovimientos = [];
    }

    depositar(monto) {

        if (monto > 0 && Number.isFinite(monto)) {

            this.saldo += monto;

            this.historialMovimientos.push(
                "Depósito: $" + monto
            );

            return true;
        }

        return false;
    }

    retirar(monto) {

        if (
            monto > 0 &&
            monto <= this.saldo &&
            Number.isFinite(monto)
        ) {

            this.saldo -= monto;

            this.historialMovimientos.push(
                "Retiro: $" + monto
            );

            return true;
        }

        return false;
    }

    consultarSaldo() {
        return this.saldo;
    }

    mostrarDatos() {

        return (
            "Titular: " + this.titular +
            "\nNúmero de cuenta: " + this.numeroCuenta +
            "\nTipo de cuenta: " + this.tipoCuenta +
            "\nSaldo disponible: $" + this.saldo
        );
    }
}


// ==========================================
// 2. CREACIÓN DE TRES CUENTAS
// ==========================================

const cuentaPrincipal = new CuentaBancaria(
    "Damian",
    "001",
    "Caja de ahorro",
    10000
);

const cuentaAhorro = new CuentaBancaria(
    "Carlos",
    "002",
    "Caja de ahorro",
    5000
);

const cuentaEmpresa = new CuentaBancaria(
    "Empresa XYZ",
    "003",
    "Cuenta corriente",
    25000
);


// ==========================================
// 3. ARRAY DE OBJETOS
// ==========================================

const cuentas = [
    cuentaPrincipal,
    cuentaAhorro,
    cuentaEmpresa
];

// Cuenta seleccionada inicialmente
let cuentaActual = cuentaPrincipal;


// ==========================================
// 4. FUNCIONES DEL SIMULADOR
// ==========================================

// Mostrar historial de movimientos
function mostrarHistorial(cuenta) {

    console.log("--- HISTORIAL DE MOVIMIENTOS ---");

    if (cuenta.historialMovimientos.length === 0) {

        console.log("No hay movimientos registrados.");

    } else {

        for (let movimiento of cuenta.historialMovimientos) {

            console.log("Movimiento: " + movimiento);
        }
    }
}


// ==========================================
// 5. FUNCIONES DE ORDEN SUPERIOR
// ==========================================

// FIND: buscar una cuenta por número
function buscarCuenta(numero) {

    return cuentas.find(
        cuenta => cuenta.numeroCuenta === numero
    );
}


// FILTER: filtrar cuentas según su saldo
function filtrarCuentas(montoMinimo) {

    return cuentas.filter(
        cuenta => cuenta.saldo >= montoMinimo
    );
}


// REDUCE: calcular el capital total del banco
function calcularCapitalTotal() {

    return cuentas.reduce(
        (total, cuenta) => total + cuenta.saldo,
        0
    );
}


// ==========================================
// 6. VERIFICACIÓN EN CONSOLA
// ==========================================

console.log("===== CUENTAS REGISTRADAS =====");

for (let cuenta of cuentas) {

    console.log(cuenta.mostrarDatos());
}

console.log(
    "Capital total del banco: $" +
    calcularCapitalTotal()
);


// ==========================================
// 7. MENÚ PRINCIPAL
// ==========================================

let continuar = true;

while (continuar) {

    let opcion = prompt(

        "SIMULADOR BANCARIO\n\n" +

        "Cuenta activa: " + cuentaActual.titular + "\n" +
        "Saldo: $" + cuentaActual.consultarSaldo() + "\n\n" +

        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Mostrar datos de la cuenta\n" +
        "5 - Consultar historial\n" +
        "6 - Cambiar de cuenta\n" +
        "7 - Buscar cuenta por número\n" +
        "8 - Filtrar cuentas por saldo\n" +
        "9 - Consultar capital total del banco\n" +
        "10 - Salir\n\n" +

        "Seleccioná una opción:"
    );

    if (opcion === null) {

        continuar = false;

    } else if (opcion === "1") {

        alert(
            "Tu saldo actual es: $" +
            cuentaActual.consultarSaldo()
        );

        console.log(
            "Consulta de saldo: $" +
            cuentaActual.consultarSaldo()
        );

        cuentaActual.historialMovimientos.push(
            "Consulta de saldo"
        );

    } else if (opcion === "2") {

        let deposito = Number(
            prompt("Ingresá el monto que querés depositar:")
        );

        if (cuentaActual.depositar(deposito)) {

            alert(
                "Depósito realizado correctamente.\n" +
                "Nuevo saldo: $" +
                cuentaActual.consultarSaldo()
            );

            console.log(
                "Depósito realizado: $" + deposito
            );

        } else {

            alert("El monto ingresado no es válido.");

            console.log("Error: depósito no válido.");
        }

    } else if (opcion === "3") {

        let retiro = Number(
            prompt("Ingresá el monto que querés retirar:")
        );

        if (cuentaActual.retirar(retiro)) {

            alert(
                "Retiro realizado correctamente.\n" +
                "Nuevo saldo: $" +
                cuentaActual.consultarSaldo()
            );

            console.log(
                "Retiro realizado: $" + retiro
            );

        } else if (
            Number.isFinite(retiro) &&
            retiro > cuentaActual.saldo
        ) {

            alert("Fondos insuficientes.");

            console.log("Error: fondos insuficientes.");

        } else {

            alert("El monto ingresado no es válido.");

            console.log("Error: retiro no válido.");
        }

    } else if (opcion === "4") {

        alert(cuentaActual.mostrarDatos());

        console.log(cuentaActual.mostrarDatos());

    } else if (opcion === "5") {

        mostrarHistorial(cuentaActual);

        alert("El historial fue mostrado en la consola.");

    } else if (opcion === "6") {

        let seleccion = prompt(
            "SELECCIONAR CUENTA\n\n" +
            "1 - Damian\n" +
            "2 - Carlos\n" +
            "3 - Empresa XYZ\n\n" +
            "Seleccioná una cuenta:"
        );

        if (seleccion === "1") {

            cuentaActual = cuentaPrincipal;

        } else if (seleccion === "2") {

            cuentaActual = cuentaAhorro;

        } else if (seleccion === "3") {

            cuentaActual = cuentaEmpresa;

        } else if (seleccion !== null) {
        alert("Selección de cuenta no válida.");
    }

        console.log(
            "Cuenta activa: " + cuentaActual.titular
        );

    } else if (opcion === "7") {

        // INTERACCIÓN CON FIND

        let numero = prompt(
            "Ingresá el número de cuenta que querés buscar:"
        );

        let cuentaEncontrada = buscarCuenta(numero);

        if (cuentaEncontrada !== undefined) {

            alert(cuentaEncontrada.mostrarDatos());

            console.log(
                "Cuenta encontrada:",
                cuentaEncontrada
            );

        } else {

            alert("No se encontró ninguna cuenta.");

            console.log("Cuenta no encontrada.");
        }

    } else if (opcion === "8") {

        // INTERACCIÓN CON FILTER

        let montoMinimo = Number(
            prompt("Ingresá el saldo mínimo que querés filtrar:")
        );

        if (
            Number.isFinite(montoMinimo) &&
            montoMinimo >= 0
        ) {

            let cuentasFiltradas = filtrarCuentas(montoMinimo);

            console.log("===== CUENTAS FILTRADAS =====");

            if (cuentasFiltradas.length > 0) {

                for (let cuenta of cuentasFiltradas) {

                    console.log(cuenta.mostrarDatos());
                }

                alert(
                    "Se encontraron " +
                    cuentasFiltradas.length +
                    " cuentas. Revisá la consola."
                );

            } else {

                alert("No hay cuentas con ese saldo mínimo.");

                console.log("No se encontraron cuentas.");
            }

        } else {

            alert("Ingresá un monto válido.");
        }

    } else if (opcion === "9") {

        // INTERACCIÓN CON REDUCE

        let capitalTotal = calcularCapitalTotal();

        alert(
            "El capital total del banco es: $" +
            capitalTotal
        );

        console.log(
            "Capital total del banco: $" + capitalTotal
        );

    } else if (opcion === "10") {

        alert("Gracias por utilizar el simulador bancario.");

        console.log("Simulador bancario finalizado.");

        continuar = false;

    } else {

        alert("Opción no válida. Intentá nuevamente.");

        console.log("Error: opción no válida.");
    }
}
