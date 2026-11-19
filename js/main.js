import {
    CuentaBancaria,
    cuentas,
    inicializarCuentas,
    guardarCuentas,
} from "./cuentas.js";

import { cargarServicios } from "./servicios.js";

// ==========================================
// CARGA ASINCRÓNICA DE INFORMACIÓN BANCARIA
// ==========================================

function cargarResumenBancario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Verificamos que las cuentas tengan información válida.
            const datosValidos =
                Array.isArray(cuentas) &&
                cuentas.every((cuenta) => Number.isFinite(cuenta.saldo));

            if (!datosValidos) {
                reject(new Error("Los datos bancarios no son válidos."));
                return;
            }

            // Calculamos información del simulador.
            const resumen = {
                cantidad: cuentas.length,
                capital: cuentas.reduce((total, cuenta) => total + cuenta.saldo, 0),
            };

            resolve(resumen);
        }, 1500);
    });
}

// ==========================================
// CONSUMO DE PROMESA CON ASYNC / AWAIT
// ==========================================

async function iniciarCargaAsincronica() {
    mensaje.setAttribute("aria-busy", "true");

    try {
        const resumen = await cargarResumenBancario();

        mostrarMensaje(
            "Información actualizada. Cuentas: " +
            resumen.cantidad +
            " | Capital total: " +
            formatearDinero(resumen.capital),
            "exito",
        );
    } catch (error) {
        mostrarMensaje(
            "No se pudo cargar la información bancaria. Intentá nuevamente.",
            "error",
        );
    } finally {
        mensaje.removeAttribute("aria-busy");
    }
}

// ==========================================
// TEMPORIZADOR DE BIENVENIDA
// ==========================================

function mostrarAvisoBienvenida() {
    setTimeout(() => {
        if (!avisoBienvenida) {
            console.error("No se encontró el elemento de bienvenida.");
            return;
        }

        avisoBienvenida.textContent =
            "¡Bienvenido al Simulador Bancario! Recordá revisar periódicamente los movimientos de tus cuentas.";

        avisoBienvenida.classList.add("aviso-visible");
    }, 4000);
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
const avisoBienvenida = document.querySelector("#avisoBienvenida");

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

    if (!guardarCuentas(cuentas)) {
        cuentas.pop();

        mostrarMensaje(
            "No se pudo guardar la nueva cuenta. Intentá nuevamente.",
            "error",
        );

        return;
    }

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

    // ELIMINAR CUENTA CON CONFIRMACIÓN
    if (accion === "eliminar") {
        Swal.fire({
            title: "¿Eliminar esta cuenta?",
            text:
                "Se eliminará la cuenta de " +
                cuenta.titular +
                " y su historial de movimientos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
        }).then((resultado) => {
            const indice = cuentas.indexOf(cuenta);

            if (indice !== -1) {
                cuentas.splice(indice, 1);

                if (!guardarCuentas(cuentas)) {
                    cuentas.splice(indice, 0, cuenta);

                    renderizarCuentas();

                    mostrarMensaje(
                        "No se pudo guardar la eliminación. La cuenta fue restaurada.",
                        "error",
                    );

                    return;
                }

                renderizarCuentas();

                mostrarMensaje(
                    "La cuenta de " + cuenta.titular + " fue eliminada correctamente.",
                    "exito",
                );
            }
        });

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

    // CONFIRMAR DEPÓSITO O RETIRO
    if (accion !== "depositar" && accion !== "retirar") {
        return;
    }

    const esDeposito = accion === "depositar";

    if (!esDeposito && monto > cuenta.saldo) {
        mostrarMensaje("Fondos insuficientes para realizar el retiro.", "error");
        return;
    }

    Swal.fire({
        title: esDeposito ? "¿Confirmar depósito?" : "¿Confirmar retiro?",
        text:
            (esDeposito ? "Vas a depositar " : "Vas a retirar ") +
            formatearDinero(monto) +
            " en la cuenta de " +
            cuenta.titular +
            ".",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar operación",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#243b53",
        cancelButtonColor: "#6c757d",
    }).then((resultado) => {
        if (!resultado.isConfirmed) {
            return;
        }

        // Guardar el estado anterior de la cuenta
        const saldoAnterior = cuenta.saldo;
        const movimientosAnteriores = cuenta.historialMovimientos.length;

        // Realizar depósito o retiro
        const operacionExitosa = esDeposito
            ? cuenta.depositar(monto)
            : cuenta.retirar(monto);

        if (!operacionExitosa) {
            mostrarMensaje("No se pudo realizar la operación.", "error");
            return;
        }

        // Comprobar que los cambios se guarden correctamente
        if (!guardarCuentas(cuentas)) {
            cuenta.saldo = saldoAnterior;

            cuenta.historialMovimientos.length = movimientosAnteriores;

            renderizarCuentas();

            mostrarMensaje(
                "No se pudo guardar la operación. Los cambios fueron revertidos.",
                "error",
            );

            return;
        }

        renderizarCuentas();

        mostrarMensaje(
            (esDeposito ? "Depósito" : "Retiro") +
            " realizado correctamente en la cuenta de " +
            cuenta.titular +
            ".",
            "exito",
        );
    });
});

// ==========================================
// VACIAR TODAS LAS CUENTAS
// ==========================================

if (botonVaciar) {
    botonVaciar.addEventListener("click", function () {
        if (cuentas.length === 0) {
            mostrarMensaje("No hay cuentas para eliminar.", "error");
            return;
        }

        Swal.fire({
            title: "¿Vaciar todas las cuentas?",
            text: "Se eliminarán todas las cuentas y sus historiales. Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar todo",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                // Guardar una copia de las cuentas actuales
                const cuentasAnteriores = [...cuentas];

                // Vaciar todas las cuentas
                cuentas.splice(0, cuentas.length);

                // Comprobar que se haya guardado el cambio
                if (!guardarCuentas(cuentas)) {
                    cuentas.push(...cuentasAnteriores);

                    renderizarCuentas();

                    mostrarMensaje(
                        "No se pudieron eliminar las cuentas. Se restauraron los datos anteriores.",
                        "error",
                    );

                    return;
                }

                renderizarCuentas();

                mostrarMensaje(
                    "Se eliminaron todas las cuentas correctamente.",
                    "exito",
                );
            }
        });
    });
}

// ==========================================
// 10. BUSCADOR EN TIEMPO REAL
// ==========================================

buscador.addEventListener("input", function () {
    renderizarCuentas();
});

// ==========================================
// 11. INICIAR LA APLICACIÓN
// ==========================================

async function iniciarAplicacion() {
    try {
        await inicializarCuentas();

        renderizarCuentas();

        iniciarCargaAsincronica();

        mostrarAvisoBienvenida();

        cargarServicios();
    } catch (error) {
        console.error("No se pudo iniciar el simulador:", error);

        mostrarMensaje(
            "No se pudieron cargar las cuentas bancarias. Verificá el archivo cuentas.json.",
            "error",
        );

        cargarServicios();
    }
}

iniciarAplicacion();
