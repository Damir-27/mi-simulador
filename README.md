# 🏦 BancoSim — Simulador Bancario

BancoSim es una aplicación web interactiva que simula operaciones bancarias básicas. Permite administrar cuentas, consultar saldos, realizar depósitos y retiros, visualizar historiales de movimientos y gestionar los servicios bancarios disponibles.

El proyecto fue desarrollado con **HTML, CSS y JavaScript**, aplicando conceptos de programación, manipulación del DOM, programación orientada a objetos, consumo de datos mediante Fetch API y almacenamiento local.

## 🚀 Funcionalidades

- **Crear cuentas bancarias:** permite registrar nuevas cuentas con titular, número, tipo de cuenta y saldo inicial.
- **Consultar cuentas:** muestra los datos y saldos de las cuentas registradas.
- **Depósitos:** permite ingresar dinero en una cuenta.
- **Retiros:** permite retirar dinero, validando que existan fondos suficientes.
- **Historial de movimientos:** registra los depósitos y retiros realizados.
- **Eliminar cuentas:** permite eliminar una cuenta individual.
- **Vaciar cuentas:** permite eliminar todas las cuentas registradas.
- **Buscador en tiempo real:** permite filtrar cuentas por titular o número.
- **Resumen bancario:** muestra información general sobre la cantidad de cuentas y el capital administrado.
- **Servicios bancarios:** carga y muestra los servicios disponibles desde un archivo JSON.
- **Persistencia de datos:** utiliza LocalStorage para conservar los cambios al recargar la página.
- **Confirmaciones y alertas:** utiliza SweetAlert2 para mejorar la interacción con el usuario.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- JavaScript Modules
- Programación Orientada a Objetos (POO)
- Fetch API
- Async/Await
- Promesas
- LocalStorage
- JSON
- SweetAlert2

## 📁 Estructura del proyecto

```text
simulador-bancario/
│
├── index.html
│
├── assets/
│   └── logo-banco.png
│
├── css/
│   └── style.css
│
├── data/
│   ├── cuentas.json
│   └── servicios.json
│
└── js/
    ├── main.js
    ├── cuentas.js
    └── servicios.js
```

## ⚙️ Instalación y ejecución

1. Clonar el repositorio desde GitHub o descargar el proyecto.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Ejecutar `index.html` mediante una extensión de servidor local, como **Live Server**.
4. Abrir la dirección local que proporciona el servidor en el navegador.

**Importante:** el proyecto debe ejecutarse mediante un servidor local para que funcionen correctamente los módulos JavaScript y las solicitudes Fetch a los archivos JSON.

## 💾 Almacenamiento de datos

BancoSim utiliza `LocalStorage` para guardar las cuentas bancarias y sus movimientos.

Esto permite conservar los datos después de cerrar o actualizar la página.

Los archivos JSON proporcionan los datos iniciales de las cuentas y los servicios bancarios.

## 📚 Conceptos de JavaScript aplicados

Durante el desarrollo se utilizaron diferentes herramientas y conceptos del lenguaje:

- Variables y constantes.
- Condicionales y estructuras de repetición.
- Funciones declaradas y funciones flecha.
- Parámetros y valores de retorno.
- Arrays y objetos.
- Métodos de arrays: `map()`, `filter()`, `find()`, `forEach()`, `reduce()` y `every()`.
- Clases, constructores, instancias y métodos.
- Manipulación dinámica del DOM.
- Eventos y delegación de eventos.
- Template literals.
- Destructuring.
- Operadores modernos.
- Módulos JavaScript.
- Fetch API y manejo de errores.
- Programación asíncrona con Promesas y Async/Await.
- Persistencia mediante LocalStorage.

## 🎯 Objetivo del proyecto

El objetivo de BancoSim es integrar los conocimientos adquiridos durante el curso de JavaScript mediante el desarrollo de una aplicación web funcional e interactiva.

El simulador representa un entorno bancario ficticio con operaciones y gestión de cuentas, aplicando buenas prácticas de organización, validación de datos y experiencia de usuario.

## 👨‍💻 Autor

Proyecto desarrollado como entrega final de un curso de JavaScript.

**BancoSim — Simulador Bancario**

