
export class CuentaBancaria {
    constructor(titular, numeroCuenta, tipoCuenta, saldo) {
        this.titular = titular;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
        this.historialMovimientos = [];
    }

    depositar(monto) {
        if (Number.isFinite(monto) && monto > 0) {
            this.saldo += monto;
            this.historialMovimientos.push("Depósito: $" + monto);
            return true;
        }

        return false;
    }

    retirar(monto) {
        if (
            Number.isFinite(monto) &&
            monto > 0 &&
            monto <= this.saldo
        ) {
            this.saldo -= monto;
            this.historialMovimientos.push("Retiro: $" + monto);
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
            " | Cuenta: " + this.numeroCuenta +
            " | Tipo: " + this.tipoCuenta +
            " | Saldo: $" + this.saldo
        );
    }
}

export function crearCuentasIniciales(datosIniciales) {
    return datosIniciales.map(
        ({ titular, numeroCuenta, tipoCuenta, saldo }) =>
            new CuentaBancaria(
                titular,
                numeroCuenta,
                tipoCuenta,
                saldo
            )
    );
}

export function cargarCuentas(datosIniciales) {
    try {
        const datosGuardados = localStorage.getItem("simuladorBancario");

        if (datosGuardados === null) {
            return crearCuentasIniciales(datosIniciales);
        }

        const cuentasGuardadas = JSON.parse(datosGuardados);

        const datosValidos =
            Array.isArray(cuentasGuardadas) &&
            cuentasGuardadas.every((cuenta) => {
                return (
                    cuenta &&
                    typeof cuenta.titular === "string" &&
                    cuenta.titular.trim() !== "" &&
                    typeof cuenta.numeroCuenta === "string" &&
                    cuenta.numeroCuenta.trim() !== "" &&
                    typeof cuenta.tipoCuenta === "string" &&
                    cuenta.tipoCuenta.trim() !== "" &&
                    Number.isFinite(cuenta.saldo) &&
                    cuenta.saldo >= 0 &&
                    (
                        cuenta.historialMovimientos === undefined ||
                        (
                            Array.isArray(cuenta.historialMovimientos) &&
                            cuenta.historialMovimientos.every(
                                (movimiento) =>
                                    typeof movimiento === "string"
                            )
                        )
                    )
                );
            });

        if (!datosValidos) {
            return crearCuentasIniciales(datosIniciales);
        }

        return cuentasGuardadas.map(
            ({
                titular,
                numeroCuenta,
                tipoCuenta,
                saldo,
                historialMovimientos = []
            }) => {
                const cuenta = new CuentaBancaria(
                    titular,
                    numeroCuenta,
                    tipoCuenta,
                    saldo
                );

                cuenta.historialMovimientos = historialMovimientos;

                return cuenta;
            }
        );

    } catch (error) {
        console.error("Error al recuperar las cuentas:", error);
        return crearCuentasIniciales(datosIniciales);
    }
}


export function guardarCuentas(cuentas) {
    try {
        localStorage.setItem(
            "simuladorBancario",
            JSON.stringify(cuentas)
        );

        return true;

    } catch (error) {
        console.error("Error al guardar las cuentas:", error);
        return false;
    }
}


export let cuentas = [];

export async function inicializarCuentas() {
    try {
        const respuesta = await fetch("./data/cuentas.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar cuentas.json");
        }

        const datosIniciales = await respuesta.json();

        const datosValidos =
            Array.isArray(datosIniciales) &&
            datosIniciales.every((cuenta) => {
                return (
                    cuenta &&
                    typeof cuenta.titular === "string" &&
                    typeof cuenta.numeroCuenta === "string" &&
                    typeof cuenta.tipoCuenta === "string" &&
                    Number.isFinite(cuenta.saldo) &&
                    cuenta.saldo >= 0
                );
            });

        if (!datosValidos) {
            throw new Error("El archivo de cuentas no tiene un formato válido.");
        }

        cuentas = cargarCuentas(datosIniciales);

        return cuentas;

    } catch (error) {
        console.error("Error al inicializar las cuentas:", error);
        throw error;
    }
}
