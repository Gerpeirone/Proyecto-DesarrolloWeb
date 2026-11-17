# CrewLab - Tienda de ropa urbana

**CrewLab** es una tienda online de moda urbana con catálogo de remeras, buzos, pantalones y zapatillas. Permite recorrer los productos por categoría, ver el detalle de cada uno, armar un carrito y completar los datos de la compra.

- **Sitio publicado (versión React):** <https://gerpeirone.github.io/Proyecto-DesarrolloWeb/app/>
- **Sitio publicado (versión HTML, CSS y JavaScript):** <https://gerpeirone.github.io/Proyecto-DesarrolloWeb/>

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
| **json-server** | 1.0 (beta) | Servicio simulado (mock) que entrega los productos |
| **Node.js** | 22 | Ejecución de los scripts y del servicio simulado |
| **Google Fonts** | - | Tipografía Montserrat |
| **Git y GitHub Pages** | - | Control de versiones y publicación |

## Estructura del proyecto

```
Proyecto-DesarrolloWeb/
├── index.html, remeras.html, buzos.html, pantalones.html, zapatillas.html
├── productos.html, checkout.html
├── css/                 Hoja de estilos única de la versión HTML
├── js/                  JavaScript de la versión HTML
├── imagenes/            Imágenes usadas por las dos versiones
├── Sketch/              Bocetos a mano (Desktop y Mobile)
├── Wireframe/           Wireframes (Desktop y Mobile)
├── app/                 Versión React compilada, publicada en GitHub Pages
└── frontend/            Código fuente de la versión React
    └── src/
        ├── api/         Consultas al servicio de productos
        ├── components/  Componentes reutilizables y componente principal
        ├── data/        Datos del catálogo (también usados por el servicio simulado) y de la tienda
        ├── pages/       Páginas asociadas a cada ruta
        ├── styles/      Estilos en archivos .scss
        └── utils/       Funciones de cálculo, formato y validación
```

Los imports de la versión React usan los alias `@api`, `@components`, `@data`, `@pages`, `@styles` y `@utils`, definidos en `frontend/vite.config.js`. Las imágenes se toman de la carpeta `imagenes` de la raíz, configurada como carpeta pública de Vite.

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

1. En una consola, dentro de `frontend`, iniciar el servicio con json-server: `npm run mock`
2. En otra consola, dentro de `frontend`, iniciar el sitio: `npm run dev:mock`

En este modo los productos se piden a `http://localhost:3001/productos` (json-server lee el archivo `src/data/productos.json`) en lugar de leerse de los datos locales.

## Scripts disponibles

Todos se ejecutan dentro de la carpeta `frontend`.

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia el sitio en modo desarrollo con los datos locales |
| `npm run mock` | Inicia el servicio simulado de productos (json-server) en el puerto 3001 |
| `npm run dev:mock` | Inicia el sitio en modo desarrollo consultando al servicio simulado |
| `npm run build` | Compila el sitio en la carpeta `app` para publicarlo |
| `npm run preview` | Muestra el sitio ya compilado |

## Dependencias y vulnerabilidades

| Dependencia | Tipo |
| --- | --- |
| `react`, `react-dom`, `react-router-dom` | Ejecución |
| `vite`, `@vitejs/plugin-react`, `sass`, `json-server` | Desarrollo |

- Dependencias de ejecución (`npm audit --omit=dev`): **0 vulnerabilidades**.
- Dependencias de desarrollo (`npm audit`): **6 avisos de severidad alta, todos por una misma falla** en `picomatch`, verificado el 17 de noviembre de 2026.

| Aviso | Paquete afectado | Llega a través de | Versión corregida |
| --- | --- | --- | --- |
| [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) (ReDoS con patrones extglob repetidos) | `picomatch` hasta 4.0.7 | `vite`, `tinyglobby`, `fdir` y `sass` (`@parcel/watcher`) | Todavía no publicada |

**Por qué no se corrige todavía:**

- `picomatch` no es una dependencia directa del proyecto: la usan internamente Vite y Sass para reconocer patrones de archivos.
- No existe una versión de `picomatch` sin la falla. Las correcciones están propuestas en su repositorio pero aún no fueron publicadas.
- `npm audit fix --force` instalaría `vite@6.2.7`, que tiene otras vulnerabilidades altas ya corregidas en Vite 8, por lo que no se aplica.
- La falla solo afecta a las herramientas de desarrollo en la computadora de quien programa. El sitio publicado en `app/` no incluye `picomatch`.

Cuando se publique la versión corregida, alcanza con ejecutar `npm update` dentro de `frontend`.

## Sketch y wireframes

- **Sketch:** carpeta [`Sketch`](Sketch), con las versiones Desktop y Mobile.
- **Wireframes:** carpeta [`Wireframe`](Wireframe), con las versiones Desktop y Mobile.

## Pruebas realizadas

Las dos versiones se probaron con los siguientes casos:

- Confirmar la compra sin ingresar ningún dato y con solo algunos campos completos.
- Ingresar cero, números negativos, decimales y letras en la cantidad, el DNI, el número de calle y el código postal.
- Ingresar números en el nombre, el apellido y la ciudad.
- Elegir envío express para una provincia distinta de Córdoba.
- Vaciar el carrito y querer finalizar la compra con el carrito vacío.
- Recargar la página con productos en el carrito.
- Abrir un producto, una categoría o una dirección que no existe.
