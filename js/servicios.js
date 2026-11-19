
function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, (caracter) => {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return caracteres[caracter];
    });
}

function renderizarServicios(servicios, listaServicios) {
    listaServicios.innerHTML = "";

    servicios.forEach((servicio) => {
        listaServicios.innerHTML += `
            <article class="servicio-card">
                <h3>${escaparHTML(servicio.nombre)}</h3>
                <p>${escaparHTML(servicio.descripcion)}</p>
                <span>${escaparHTML(servicio.beneficio)}</span>
            </article>
        `;
    });
}

export async function cargarServicios() {
    const estadoServicios = document.querySelector("#estadoServicios");
    const listaServicios = document.querySelector("#listaServicios");

    if (!estadoServicios || !listaServicios) {
        console.error("No se encontraron los elementos de servicios.");
        return;
    }

    estadoServicios.hidden = false;
    estadoServicios.textContent = "Cargando servicios bancarios...";
    listaServicios.innerHTML = "";

    try {
        const respuesta = await fetch("./data/servicios.json");

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los servicios.");
        }

        const servicios = await respuesta.json();

        const datosValidos =
            Array.isArray(servicios) &&
            servicios.length > 0 &&
            servicios.every((servicio) =>
                servicio &&
                typeof servicio.nombre === "string" &&
                servicio.nombre.trim() !== "" &&
                typeof servicio.descripcion === "string" &&
                servicio.descripcion.trim() !== "" &&
                typeof servicio.beneficio === "string" &&
                servicio.beneficio.trim() !== ""
            );
        if (!datosValidos) {
            throw new Error("El formato de los servicios no es válido.");
        }

        renderizarServicios(servicios, listaServicios);

    } catch (error) {
        console.error("Error al cargar servicios:", error);

        listaServicios.innerHTML = "";

        estadoServicios.hidden = false;
        estadoServicios.textContent =
            "No se pudieron cargar los servicios bancarios.";

        Swal.fire({
            title: "No se pudieron cargar los servicios bancarios.",
            text: "Verificá el archivo servicios.json.",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#243b53"
        });

    } finally {
    if (listaServicios.children.length > 0) {
        estadoServicios.hidden = true;
    }
}
}
