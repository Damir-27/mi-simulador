
# 🏦 Simulador Bancario

## 📌 Descripción del proyecto

Este proyecto consiste en un simulador bancario desarrollado con HTML, CSS y JavaScript, que permite administrar diferentes cuentas bancarias mediante una interfaz gráfica e interactiva.

El simulador permite crear cuentas, consultar saldos, realizar depósitos y retiros, visualizar los datos de cada cuenta, eliminar cuentas y consultar el historial de movimientos directamente desde la pantalla.

El objetivo del proyecto es aplicar los conocimientos adquiridos durante el aprendizaje de JavaScript, incorporando variables, funciones, estructuras condicionales, arrays, métodos de manipulación de arrays, clases, objetos, funciones de orden superior y manipulación del DOM.

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

## 🛠️ Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript.
- Visual Studio Code.
- Git y GitHub.

## 📚 Conceptos de JavaScript aplicados

Durante el desarrollo del proyecto se implementaron los siguientes conceptos:

- Variables (`let` y `const`).
- Estructuras condicionales (`if`, `else if`, `else`).
- Funciones y parámetros.
- Funciones flecha.
- Arrays y arrays de objetos.
- Métodos de manipulación de arrays:
  - `push()`
  - `indexOf()`
  - `splice()`
  - `forEach()`
  - `includes()`
- Funciones de orden superior:
  - `find()`
  - `filter()`
  - `reduce()`
  - `map()`
- Programación Orientada a Objetos (POO).
- Clases (`class`).
- Constructores.
- Instanciación de objetos (`new`).
- Métodos y propiedades.
- Uso de `this` y `return`.
- Manipulación del DOM mediante `querySelector()` e `innerHTML`.
- Manejo de eventos mediante `addEventListener()`.
- Delegación de eventos.
- Validación de datos ingresados por el usuario.
- Generación dinámica de contenido HTML mediante template literals.

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
└── README.md
```

## ▶️ Cómo ejecutar el proyecto

Para ejecutar el simulador, seguí estos pasos:

1. Cloná o descargá el repositorio desde GitHub.
2. Abrí la carpeta del proyecto con Visual Studio Code.
3. Verificá que los archivos CSS y JavaScript estén vinculados correctamente desde `index.html`.
4. Abrí el archivo `index.html` en un navegador web.
5. Interactuá con el simulador utilizando los formularios, botones y buscador disponibles en la interfaz.

## 💾 Almacenamiento de datos

Actualmente, las cuentas bancarias y sus movimientos se almacenan en memoria mediante arrays y objetos de JavaScript.

Esto significa que los datos se mantienen mientras la aplicación está abierta, pero se reinician al actualizar o cerrar la página.

## 👨‍💻 Autor

Proyecto desarrollado como parte del aprendizaje de JavaScript.