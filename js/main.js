
// ==========================================
// 1. CREACIÓN DE LA CLASE CUENTA BANCARIA
// ==========================================

class CuentaBancaria {

    constructor(titular, numeroCuenta, tipoCuenta, saldo) {

        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;

        // Array para guardar los movimientos
        this.historialMovimientos = [];
    }

    // MÉTODO PARA DEPOSITAR DINERO
    depositar(monto) {

        if (monto > 0 && Number.isFinite(monto)) {

            this.saldo += monto;

            this.historialMovimientos.push(
                "Depósito: $" + monto
            );

            return true;

        } else {

            return false;
        }
    }

    // MÉTODO PARA RETIRAR DINERO
    retirar(monto) {

        if (monto > 0 && monto <= this.saldo &&
            Number.isFinite(monto)) {

            this.saldo -= monto;

            this.historialMovimientos.push(
                "Retiro: $" + monto
            );

            return true;

        } else {

            return false;
        }
    }

    // MÉTODO PARA CONSULTAR SALDO
    consultarSaldo() {

        return this.saldo;
    }

    // MÉTODO PARA MOSTRAR LOS DATOS DE LA CUENTA
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
// 2. INSTANCIACIÓN DE TRES OBJETOS
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
// 3. VERIFICACIÓN DE LOS MÉTODOS
// ==========================================

// Ejecutamos operaciones en los tres objetos

cuentaPrincipal.depositar(500);
cuentaPrincipal.retirar(500);

cuentaAhorro.depositar(300);
cuentaAhorro.retirar(300);

cuentaEmpresa.retirar(1000);
cuentaEmpresa.depositar(1000);


// Guardamos las cuentas en un array
const cuentas = [
    cuentaPrincipal,
    cuentaAhorro,
    cuentaEmpresa
];

// Mostramos los resultados en consola
console.log("===== VERIFICACIÓN DE CUENTAS =====");

for (let cuenta of cuentas) {

    console.log(cuenta.mostrarDatos());

    console.log(
        "Saldo final: $" + cuenta.consultarSaldo()
    );

    console.log("-----------------------------");
}


// ==========================================
// 4. FUNCIÓN PARA MOSTRAR EL HISTORIAL
// ==========================================

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
// 5. SIMULADOR BANCARIO INTERACTIVO
// ==========================================

let continuar = true;

while (continuar) {

    let opcion = prompt(
        "SIMULADOR BANCARIO\n\n" +
        "Titular: " + cuentaPrincipal.titular + "\n" +
        "Saldo: $" + cuentaPrincipal.consultarSaldo() + "\n\n" +
        "1 - Consultar saldo\n" +
        "2 - Depositar dinero\n" +
        "3 - Retirar dinero\n" +
        "4 - Mostrar datos de la cuenta\n" +
        "5 - Consultar historial\n" +
        "6 - Salir\n\n" +
        "Seleccioná una opción:"
    );

    if (opcion === "1") {

        alert(
            "Tu saldo actual es: $" +
            cuentaPrincipal.consultarSaldo()
        );

        console.log(
            "Consulta de saldo: $" +
            cuentaPrincipal.consultarSaldo()
        );

        cuentaPrincipal.historialMovimientos.push(
            "Consulta de saldo"
        );

    } else if (opcion === "2") {

        let deposito = Number(
            prompt("Ingresá el monto que querés depositar:")
        );

        if (cuentaPrincipal.depositar(deposito)) {

            alert(
                "Depósito realizado correctamente.\n" +
                "Nuevo saldo: $" +
                cuentaPrincipal.consultarSaldo()
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

        if (retiro > 0 && retiro <= cuentaPrincipal.saldo) {

            cuentaPrincipal.retirar(retiro);

            alert(
                "Retiro realizado correctamente.\n" +
                "Nuevo saldo: $" +
                cuentaPrincipal.consultarSaldo()
            );

            console.log(
                "Retiro realizado: $" + retiro
            );

        } else if (retiro > cuentaPrincipal.saldo && retiro > 0) {

            alert("Fondos insuficientes.");

            console.log("Error: fondos insuficientes.");

        } else {

            alert("El monto ingresado no es válido.");

            console.log("Error: retiro no válido.");
        }

    } else if (opcion === "4") {

        alert(cuentaPrincipal.mostrarDatos());

        console.log(cuentaPrincipal.mostrarDatos());

    } else if (opcion === "5") {

        mostrarHistorial(cuentaPrincipal);

        alert("El historial fue mostrado en la consola.");

    } else if (opcion === "6") {

        alert("Gracias por utilizar el simulador bancario.");

        console.log("Simulador bancario finalizado.");

        continuar = false;

    } else {

        alert("Opción no válida. Intentá nuevamente.");

        console.log("Error: opción no válida.");
    }
}
