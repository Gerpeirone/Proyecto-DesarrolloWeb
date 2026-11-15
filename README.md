# CrewLab - Tienda de ropa urbana

**CrewLab** es una tienda online de moda urbana con catálogo de remeras, buzos, pantalones y zapatillas. Permite recorrer los productos por categoría, ver el detalle de cada uno, armar un carrito y completar los datos de la compra.

- **Sitio publicado (versión React):** <https://ucc-tallerdesarrolloweb.github.io/proyecto2025-alterman-peirone/app/>
- **Sitio publicado (versión HTML, CSS y JavaScript):** <https://ucc-tallerdesarrolloweb.github.io/proyecto2025-alterman-peirone/>

## Índice

1. [Autores](#autores)
2. [Contenido del sitio](#contenido-del-sitio)
3. [Tecnologías utilizadas](#tecnologías-utilizadas)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Pasos de ejecución](#pasos-de-ejecución)
6. [Scripts disponibles](#scripts-disponibles)
7. [Dependencias y vulnerabilidades](#dependencias-y-vulnerabilidades)
8. [Sketch y wireframes](#sketch-y-wireframes)
9. [Pruebas realizadas](#pruebas-realizadas)

## Autores

| Autor | Rol | GitHub |
| --- | --- | --- |
| **Ivo Alterman** | Desarrollador | [@ivoalterman](https://github.com/ivoalterman) |
| **German Peirone** | Desarrollador | [@Gerpeirone](https://github.com/Gerpeirone) |

Proyecto académico de la materia **Taller de Desarrollo Web** de la Universidad Católica de Córdoba (UCC).

## Contenido del sitio

### Páginas

| Página | Versión HTML | Versión React | Contenido |
| --- | --- | --- | --- |
| Inicio | `index.html` | `/` | Carrusel de promociones, productos más vendidos y datos de la tienda |
| Categorías | `remeras.html`, `buzos.html`, `pantalones.html`, `zapatillas.html` | `/categoria/:categoria` | Listado de productos de la categoría |
| Detalle | `productos.html?id=1` | `/producto/:id` | Galería, talle, cantidad, subtotal y botón para agregar al carrito |
| Carrito | Ventana desplegable en el encabezado | `/carrito` | Productos elegidos, cantidades, total y vaciado del carrito |
| Compra | `checkout.html` | `/checkout` | Resumen, método de envío, total y formulario del comprador |

### Funcionalidades

- **Cálculo del subtotal** en el detalle del producto: precio por cantidad.
- **Cálculo del total de la compra**: subtotal de los productos más el costo del método de envío elegido.
- **Validación de datos** con aviso al usuario y blanqueo del campo incorrecto: cantidad, nombre, apellido, DNI, número de calle, piso, código postal, ciudad y provincia.
- **Carrito persistente**: se conserva al recargar la página porque se guarda en el almacenamiento del navegador.
- **Diseño adaptable** a computadoras y celulares.

## Tecnologías utilizadas

| Tecnología | Versión | Uso en el proyecto |
| --- | --- | --- |
| **HTML5** | - | Estructura y etiquetas semánticas |
| **CSS3** | - | Estilos de la versión HTML |
| **JavaScript** | ES2020 | Funcionalidad, validaciones y cálculos |
| **React** | 19 | Componentes y manejo del estado con Hooks |
| **Vite** | 8 | Creación del proyecto React, servidor de desarrollo y compilación |
| **React Router DOM** | 7 | Enrutamiento entre páginas y rutas hijas con `Outlet` |
| **Sass** | 1.108 | Estilos de la versión React en archivos `.scss` |
| **Node.js** | 22 | Ejecución de los scripts y del servicio simulado |
| **Google Fonts** | - | Tipografía Montserrat |
| **Git y GitHub Pages** | - | Control de versiones y publicación |

## Estructura del proyecto

```
proyecto2025-alterman-peirone/
├── index.html, remeras.html, buzos.html, pantalones.html, zapatillas.html
├── productos.html, checkout.html
├── css/                 Hoja de estilos única de la versión HTML
├── js/                  JavaScript de la versión HTML
├── imagenes/            Imágenes usadas por las dos versiones
├── Sketch/              Bocetos a mano (Desktop y Mobile)
├── Wireframes/          Wireframes (Desktop y Mobile)
├── app/                 Versión React compilada, publicada en GitHub Pages
└── frontend/            Código fuente de la versión React
    ├── mock/            Servicio simulado de productos
    └── src/
        ├── api/         Consultas al servicio de productos
        ├── components/  Componentes reutilizables y componente principal
        ├── data/        Datos del catálogo y de la tienda
        ├── pages/       Páginas asociadas a cada ruta
        ├── styles/      Estilos en archivos .scss
        └── utils/       Funciones de cálculo, validación y Hooks propios
```

Los imports de la versión React usan los alias `@api`, `@components`, `@data`, `@pages`, `@styles`, `@utils` e `@imagenes`, definidos en `frontend/vite.config.js`.

## Pasos de ejecución

### Versión HTML

1. Clonar el repositorio.
2. Abrir `index.html` en el navegador.

### Versión React

1. Tener instalado [Node.js](https://nodejs.org/) versión 20 o superior.
2. Entrar a la carpeta del proyecto React: `cd frontend`
3. Instalar las dependencias: `npm install`
4. Iniciar el servidor de desarrollo: `npm run dev`
5. Abrir en el navegador la dirección que muestra la consola, por defecto <http://localhost:5173/>.

### Versión React con el servicio simulado

1. En una consola, dentro de `frontend`, iniciar el servicio: `npm run mock`
2. En otra consola, dentro de `frontend`, iniciar el sitio: `npm run dev:mock`

En este modo los productos se piden a `http://localhost:3001/productos` en lugar de leerse de los datos locales.

## Scripts disponibles

Todos se ejecutan dentro de la carpeta `frontend`.

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia el sitio en modo desarrollo con los datos locales |
| `npm run mock` | Inicia el servicio simulado de productos en el puerto 3001 |
| `npm run dev:mock` | Inicia el sitio en modo desarrollo consultando al servicio simulado |
| `npm run build` | Compila el sitio en la carpeta `app` para publicarlo |
| `npm run preview` | Muestra el sitio ya compilado |

## Dependencias y vulnerabilidades

El resultado de `npm audit` es **0 vulnerabilidades** (críticas, altas, moderadas y bajas), verificado el 15 de noviembre de 2026.

| Dependencia | Tipo |
| --- | --- |
| `react`, `react-dom`, `react-router-dom` | Ejecución |
| `vite`, `@vitejs/plugin-react`, `sass` | Desarrollo |

## Sketch y wireframes

- **Sketch:** carpeta [`Sketch`](Sketch), con las versiones Desktop y Mobile.
- **Wireframes:** carpeta [`Wireframes`](Wireframes), con las versiones Desktop y Mobile.

## Pruebas realizadas

Las dos versiones se probaron con los siguientes casos:

- Confirmar la compra sin ingresar ningún dato y con solo algunos campos completos.
- Ingresar cero, números negativos, decimales y letras en la cantidad, el DNI, el número de calle y el código postal.
- Ingresar números en el nombre, el apellido y la ciudad.
- Elegir envío express para una provincia distinta de Córdoba.
- Vaciar el carrito y querer finalizar la compra con el carrito vacío.
- Recargar la página con productos en el carrito.
- Abrir un producto, una categoría o una dirección que no existe.
