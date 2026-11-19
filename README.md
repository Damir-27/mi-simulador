# 🏦 Simulador Bancario

## 📌 Descripción del proyecto

Este proyecto consiste en un simulador bancario desarrollado con HTML, CSS y JavaScript, que permite administrar diferentes cuentas bancarias mediante una interfaz gráfica e interactiva.

El simulador permite crear cuentas, consultar saldos, realizar depósitos y retiros, visualizar los datos de cada cuenta, eliminar cuentas y consultar el historial de movimientos directamente desde la pantalla.

Además, incorpora almacenamiento persistente mediante `localStorage` y carga asincrónica de servicios bancarios desde un archivo JSON externo.

El objetivo del proyecto es aplicar los conocimientos adquiridos durante el aprendizaje de JavaScript, incorporando variables, funciones, estructuras condicionales, arrays, métodos de manipulación de arrays, clases, objetos, funciones de orden superior, manipulación del DOM, almacenamiento web y consumo de datos mediante `fetch()`.

## 🚀 Funcionalidades

El simulador cuenta con las siguientes funcionalidades:

1. **Crear cuentas:** permite registrar nuevas cuentas bancarias mediante un formulario.
2. **Consultar saldo:** permite visualizar el saldo disponible de cada cuenta.
3. **Depositar dinero:** permite ingresar dinero y actualizar el saldo de una cuenta.
4. **Retirar dinero:** permite retirar dinero siempre que existan fondos suficientes.
5. **Mostrar datos de la cuenta:** permite consultar el titular, número y tipo de cuenta.
6. **Consultar historial:** permite visualizar los depósitos y retiros realizados en cada cuenta mediante el botón «Ver historial».
7. **Eliminar cuentas:** permite eliminar cuentas bancarias del listado.
8. **Buscar cuentas:** permite filtrar las cuentas por nombre del titular o número de cuenta.
9. **Resumen general:** muestra la cantidad de cuentas registradas y el capital total administrado.
10. **Mensajes de validación:** muestra mensajes de éxito o error directamente en la interfaz.
11. **Persistencia de datos:** guarda las cuentas y sus movimientos en `localStorage`, conservando la información al recargar la página.
12. **Servicios bancarios:** obtiene información de los servicios disponibles desde un archivo JSON externo y los muestra dinámicamente en la interfaz.
13. **Carga asincrónica:** informa al usuario mientras se obtienen los datos y contempla posibles errores durante la solicitud.
14. **Notificaciones:** utiliza la librería SweetAlert2 para mostrar avisos de carga exitosa y errores.

## 🛠️ Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript.
- SweetAlert2.
- JSON.
- localStorage.
- Fetch API.
- Visual Studio Code.
- Git y GitHub.

## 📚 Conceptos de JavaScript aplicados

Durante el desarrollo del proyecto se implementaron los siguientes conceptos:

**Fundamentos de JavaScript**
- Variables (`let` y `const`).
- Estructuras condicionales (`if`, `else if`, `else`).
- Estructuras repetitivas.
- Funciones y parámetros.
- Funciones flecha.
- Valores de retorno (`return`).

**Arrays y objetos**
- Arrays y arrays de objetos.
- Métodos de manipulación de arrays:
  - `push()`
  - `unshift()`
  - `pop()`
  - `shift()`
  - `splice()`
  - `indexOf()`
  - `includes()`
- Funciones de orden superior:
  - `find()`
  - `filter()`
  - `reduce()`
  - `map()`
  - `forEach()`

**Programación Orientada a Objetos**
- Clases (`class`).
- Constructores.
- Instanciación de objetos (`new`).
- Métodos y propiedades.
- Uso de `this`.

**Manipulación del DOM**
- `querySelector()`.
- `innerHTML`.
- `textContent`.
- `addEventListener()`.
- Delegación de eventos.
- Generación dinámica de contenido HTML mediante template literals.
- Validación de datos ingresados por el usuario.

**Almacenamiento y asincronía**
- `localStorage`.
- `JSON.stringify()`.
- `JSON.parse()`.
- Fetch API (`fetch()`).
- Promesas (`Promise`).
- `async` y `await`.
- Manejo de errores con `try`, `catch` y `finally`.
- Consumo de archivos JSON.
- Operadores modernos de JavaScript.

## 📂 Estructura del proyecto

```text
simulador-bancario/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
├── data/
│   └── servicios.json
│
└── README.md
```

## ▶️ Cómo ejecutar el proyecto

Para ejecutar el simulador, seguí estos pasos:

1. Cloná o descargá el repositorio desde GitHub.
2. Abrí la carpeta del proyecto con Visual Studio Code.
3. Verificá que los archivos CSS y JavaScript estén vinculados correctamente desde `index.html`.
4. Abrí el proyecto utilizando la extensión **Live Server** de Visual Studio Code.
5. Ingresá a la página desde el navegador.
6. Interactuá con el simulador utilizando los formularios, botones y buscador disponibles en la interfaz.

**Importante:** se recomienda utilizar Live Server para que `fetch()` pueda acceder correctamente al archivo `data/servicios.json`. La librería SweetAlert2 se incorpora mediante CDN, por lo que requiere conexión a Internet para cargarse.

## 💾 Almacenamiento de datos

El simulador utiliza `localStorage` para guardar las cuentas bancarias y sus respectivos historiales de movimientos.

De esta manera, la información permanece almacenada en el navegador incluso después de recargar o cerrar la página.

Los servicios bancarios, por otra parte, se obtienen desde el archivo `data/servicios.json` mediante una solicitud asincrónica con Fetch API.

## 👨‍💻 Autor

Proyecto desarrollado como parte del aprendizaje de JavaScript.