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
        if (Number.isFinite(monto) && monto > 0) {
            this.saldo += monto;

            this.historialMovimientos.push("Depósito: $" + monto);

            return true;
        }

        return false;
    }

    retirar(monto) {
        if (Number.isFinite(monto) && monto > 0 && monto <= this.saldo) {
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
            "Titular: " +
            this.titular +
            " | Cuenta: " +
            this.numeroCuenta +
            " | Tipo: " +
            this.tipoCuenta +
            " | Saldo: $" +
            this.saldo
        );
    }
}

// ==========================================
// 2. PERSISTENCIA DE CUENTAS EN LOCALSTORAGE
// ==========================================

const CLAVE_STORAGE = "simuladorBancario";

// Crear las cuentas iniciales
function crearCuentasIniciales() {
    return [
        new CuentaBancaria("Damian", "001", "Caja de ahorro", 10000),
        new CuentaBancaria("Carlos", "002", "Caja de ahorro", 5000),
        new CuentaBancaria("Empresa XYZ", "003", "Cuenta corriente", 25000),
    ];
}

// Recuperar las cuentas guardadas
function cargarCuentas() {
    try {
        const datosGuardados = JSON.parse(
            localStorage.getItem(CLAVE_STORAGE) ?? "null"
        );

        if (!Array.isArray(datosGuardados)) {
            return crearCuentasIniciales();
        }

        // Destructuring para recuperar las propiedades de cada cuenta
        return datosGuardados.map(
            ({
                titular,
                numeroCuenta,
                tipoCuenta,
                saldo,
                historialMovimientos = [],
            }) => {
                const cuenta = new CuentaBancaria(
                    titular,
                    numeroCuenta,
                    tipoCuenta,
                    saldo
                );

                cuenta.historialMovimientos = historialMovimientos ?? [];

                return cuenta;
            }
        );
    } catch (error) {
        return crearCuentasIniciales();
    }
}

// ==========================================
// 3. Array principal de cuentas
// ==========================================
const cuentas = cargarCuentas();

// Guardar las cuentas actualizadas
function guardarCuentas() {
    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(cuentas)
    );
}


// ==========================================
// 4. SELECCIÓN DE ELEMENTOS DEL DOM
// ==========================================

const formularioCuenta = document.querySelector("#formularioCuenta");
const listaCuentas = document.querySelector("#listaCuentas");
const buscador = document.querySelector("#buscador");
const mensaje = document.querySelector("#mensaje");
const totalCuentas = document.querySelector("#totalCuentas");
const capitalTotal = document.querySelector("#capitalTotal");

const inputTitular = document.querySelector("#titular");
const inputNumero = document.querySelector("#numeroCuenta");
const inputTipo = document.querySelector("#tipoCuenta");
const inputSaldo = document.querySelector("#saldoInicial");
const botonVaciar = document.querySelector("#vaciarCuentas");

// ==========================================
// 5. FUNCIONES AUXILIARES
// ==========================================

// Formatear importes como moneda argentina
function formatearDinero(monto) {
    return monto.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });
}

// Evitar que los datos ingresados se interpreten como HTML
function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, (caracter) => {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };

        return caracteres[caracter];
    });
}

// Mostrar mensajes en pantalla
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
}

// ==========================================
// 6. ACTUALIZAR RESUMEN
// ==========================================

function actualizarResumen() {
    totalCuentas.textContent = cuentas.length;

    const total = cuentas.reduce(
        (acumulador, cuenta) => acumulador + cuenta.saldo,
        0,
    );

    capitalTotal.textContent = formatearDinero(total);
}

// ==========================================
// 7. RENDERIZADO DINÁMICO
// ==========================================

function renderizarCuentas() {
    const busqueda = buscador.value.trim().toLowerCase();

    const cuentasFiltradas = cuentas.filter((cuenta) => {
        return (
            cuenta.titular.toLowerCase().includes(busqueda) ||
            cuenta.numeroCuenta.toLowerCase().includes(busqueda)
        );
    });

    listaCuentas.innerHTML = "";

    if (cuentasFiltradas.length === 0) {
        listaCuentas.innerHTML = `
            <p class="sin-resultados">
                No se encontraron cuentas.
            </p>
        `;

        actualizarResumen();
        return;
    }

    cuentasFiltradas.forEach((cuenta) => {
        const movimientosHTML =
            cuenta.historialMovimientos.length > 0
                ? cuenta.historialMovimientos
                    .map(
                        (movimiento) => `
        <li>${escaparHTML(movimiento)}</li>
    `,
                    )
                    .join("")
                : "<li>Todavía no hay movimientos registrados.</li>";

        listaCuentas.innerHTML += `
            <article class="cuenta-card">

                <h3>${escaparHTML(cuenta.titular)}</h3>

                <p class="dato-cuenta">
                    Número de cuenta:
                    ${escaparHTML(cuenta.numeroCuenta)}
                </p>

                <p class="dato-cuenta">
                    Tipo:
                    ${escaparHTML(cuenta.tipoCuenta)}
                </p>

                <p class="saldo-cuenta">
                    ${formatearDinero(cuenta.saldo)}
                </p>

                <div class="operaciones">

                    <input
                        type="number"
                        class="monto-operacion"
                        min="0.01"
                        step="0.01"
                        placeholder="Ingresá un monto"
                        aria-label="Monto para ${escaparHTML(cuenta.titular)}"
                    >

                    <button
                        type="button"
                        class="boton boton-depositar"
                        data-accion="depositar"
                        data-cuenta="${escaparHTML(cuenta.numeroCuenta)}"
                    >
                        Depositar
                    </button>

                    <button
                        type="button"
                        class="boton boton-retirar"
                        data-accion="retirar"
                        data-cuenta="${escaparHTML(cuenta.numeroCuenta)}"
                    >
                        Retirar
                    </button>

                    <button
                        type="button"
                        class="boton boton-eliminar"
                        data-accion="eliminar"
                        data-cuenta="${escaparHTML(cuenta.numeroCuenta)}"
                    >
                        Eliminar
                    </button>

                </div>

                <button
                    type="button"
                    class="boton boton-historial"
                    data-accion="historial"
                    data-cuenta="${escaparHTML(cuenta.numeroCuenta)}"
                >
                    Ver historial
                </button>

                <div class="historial-cuenta" hidden>
                    <h4>Historial de movimientos</h4>
                    <ul>
                        ${movimientosHTML}
                    </ul>
                </div>

            </article>
        `;
    });

    actualizarResumen();
}

// ==========================================
// 8. AGREGAR UNA NUEVA CUENTA
// ==========================================

formularioCuenta.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titular = inputTitular.value.trim();
    const numero = inputNumero.value.trim();
    const tipo = inputTipo.value;
    const saldo = Number(inputSaldo.value);

    if (
        titular === "" ||
        numero === "" ||
        tipo === "" ||
        inputSaldo.value.trim() === "" ||
        !Number.isFinite(saldo) ||
        saldo < 0
    ) {
        mostrarMensaje("Completá todos los campos con datos válidos.", "error");

        return;
    }

    const cuentaExistente = cuentas.find(
        (cuenta) => cuenta.numeroCuenta === numero,
    );

    if (cuentaExistente) {
        mostrarMensaje("Ya existe una cuenta con ese número.", "error");

        return;
    }

    const nuevaCuenta = new CuentaBancaria(titular, numero, tipo, saldo);

    cuentas.push(nuevaCuenta);

    guardarCuentas();

    formularioCuenta.reset();

    renderizarCuentas();

    mostrarMensaje(
        "La cuenta de " + titular + " fue creada correctamente.",
        "exito",
    );
});

// ==========================================
// 9. EVENTOS DE LOS BOTONES
// ==========================================

listaCuentas.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-accion]");

    if (!boton) {
        return;
    }

    const accion = boton.dataset.accion;
    const numeroCuenta = boton.dataset.cuenta;

    const cuenta = cuentas.find((cuenta) => cuenta.numeroCuenta === numeroCuenta);

    if (!cuenta) {
        mostrarMensaje("No se encontró la cuenta.", "error");
        return;
    }

    if (accion === "historial") {
        const tarjeta = boton.closest(".cuenta-card");
        const historial = tarjeta.querySelector(".historial-cuenta");

        historial.hidden = !historial.hidden;

        boton.textContent = historial.hidden
            ? "Ver historial"
            : "Ocultar historial";

        return;
    }

    // ELIMINAR CUENTA
    if (accion === "eliminar") {
        const indice = cuentas.indexOf(cuenta);

        cuentas.splice(indice, 1);

        guardarCuentas();

        renderizarCuentas();

        mostrarMensaje(
            "La cuenta de " + cuenta.titular + " fue eliminada.",
            "exito",
        );

        return;
    }

    // OBTENER EL IMPORTE INGRESADO
    const tarjeta = boton.closest(".cuenta-card");
    const inputMonto = tarjeta.querySelector(".monto-operacion");
    const monto = Number(inputMonto.value);

    if (!Number.isFinite(monto) || monto <= 0) {
        mostrarMensaje("Ingresá un monto mayor a cero.", "error");

        return;
    }

    // DEPOSITAR
    if (accion === "depositar") {
        if (cuenta.depositar(monto)) {
            mostrarMensaje(
                "Depósito realizado correctamente en la cuenta de " +
                cuenta.titular +
                ".",
                "exito",
            );
        } else {
            mostrarMensaje("No se pudo realizar el depósito.", "error");
        }
    }
    // RETIRAR
    else if (accion === "retirar") {
        if (cuenta.retirar(monto)) {
            mostrarMensaje(
                "Retiro realizado correctamente en la cuenta de " +
                cuenta.titular +
                ".",
                "exito",
            );
        } else {
            mostrarMensaje("Fondos insuficientes para realizar el retiro.", "error");
        }
    }
    guardarCuentas();

    renderizarCuentas();
});
// ==========================================
// VACIAR TODAS LAS CUENTAS
// ==========================================

if (botonVaciar) {
    botonVaciar.addEventListener("click", function () {
        cuentas.splice(0, cuentas.length);

        guardarCuentas();
        renderizarCuentas();

        mostrarMensaje(
            "Se eliminaron todas las cuentas.",
            "exito"
        );
    });
}



// ==========================================
// 10. BUSCADOR EN TIEMPO REAL
// ==========================================

buscador.addEventListener("keyup", function () {
    renderizarCuentas();
});

// ==========================================
// 11. INICIAR LA APLICACIÓN
// ==========================================

guardarCuentas();

renderizarCuentas();
