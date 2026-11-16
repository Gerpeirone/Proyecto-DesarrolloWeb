"use strict";

const TALLES_ROPA = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const TALLES_CALZADO = ["38", "39", "40", "41", "42", "43", "44"];

const PRODUCTOS = [
  { id: 1, nombre: "Remera Azul Design", precio: 30000, categoria: "remeras", imagen: "imagenes/remeras/remera-azul-design.jpg", imagenSecundaria: "imagenes/remeras/remera-azul-design-detras.jpg", talles: TALLES_ROPA, descripcion: "Diseño exclusivo y vibrante." },
  { id: 2, nombre: "Remera Blanca Basic", precio: 33000, categoria: "remeras", imagen: "imagenes/remeras/remera-blanca-basic.jpg", imagenSecundaria: "imagenes/remeras/remera-blanca-basic-perfil.jpg", talles: TALLES_ROPA, descripcion: "Algodón suave y calce perfecto." },
  { id: 3, nombre: "Remera Crema Simply", precio: 37000, categoria: "remeras", imagen: "imagenes/remeras/remera-crema-simply.jpg", imagenSecundaria: "imagenes/remeras/remera-crema-simply-detras.jpg", talles: TALLES_ROPA, descripcion: "Tono neutro, ideal para combinar." },
  { id: 4, nombre: "Remera Gris Over Estampada", precio: 41000, categoria: "remeras", imagen: "imagenes/remeras/remera-gris-over-estampada.jpg", imagenSecundaria: "imagenes/remeras/remera-gris-over-estampada-detras.png", talles: TALLES_ROPA, descripcion: "Estampado grande y estilo urbano." },
  { id: 5, nombre: "Remera Negra Basic", precio: 45000, categoria: "remeras", imagen: "imagenes/remeras/remera-negra-basic.jpg", imagenSecundaria: "imagenes/remeras/remera-negra-basic-detras.jpg", talles: TALLES_ROPA, descripcion: "El clásico que nunca falla." },
  { id: 6, nombre: "Remera Negra Simply", precio: 50000, categoria: "remeras", imagen: "imagenes/remeras/remera-negra-simply.jpg", imagenSecundaria: "imagenes/remeras/remera-negra-simply-detras.jpg", talles: TALLES_ROPA, descripcion: "Corte clásico en negro, ideal para todos los días." },
  { id: 7, nombre: "Buzo Blanco Bordado", precio: 60000, categoria: "buzos", imagen: "imagenes/buzos/buzo-blanco-bordado.jpg", imagenSecundaria: "imagenes/buzos/buzo-blanco-bordado-2.jpg", talles: TALLES_ROPA, descripcion: "Detalle bordado de alta precisión." },
  { id: 8, nombre: "Buzo Design", precio: 70000, categoria: "buzos", imagen: "imagenes/buzos/buzo-design.jpg", imagenSecundaria: "imagenes/buzos/buzo-design-2.jpg", talles: TALLES_ROPA, descripcion: "Diseño gráfico único y moderno." },
  { id: 9, nombre: "Buzo Gris Desgastado", precio: 75000, categoria: "buzos", imagen: "imagenes/buzos/buzo-gris-desgastado.jpg", imagenSecundaria: "imagenes/buzos/buzo-gris-desgastado-2.jpg", talles: TALLES_ROPA, descripcion: "Efecto vintage desgastado." },
  { id: 10, nombre: "Buzo Gris Estampado", precio: 80000, categoria: "buzos", imagen: "imagenes/buzos/buzo-gris-estampado.jpg", imagenSecundaria: "imagenes/buzos/buzo-gris-estampado-2.jpg", talles: TALLES_ROPA, descripcion: "Estampado minimalista en la espalda." },
  { id: 11, nombre: "Buzo Negro Basic", precio: 90000, categoria: "buzos", imagen: "imagenes/buzos/buzo-negro-basic.jpg", imagenSecundaria: "imagenes/buzos/buzo-negro-basic-2.webp", talles: TALLES_ROPA, descripcion: "Buzo clásico de frisa de algodón." },
  { id: 12, nombre: "Buzo Negro Desgastado", precio: 100000, categoria: "buzos", imagen: "imagenes/buzos/buzo-negro-desgastado.jpg", imagenSecundaria: "imagenes/buzos/buzo-negro-desgastado-2.jpg", talles: TALLES_ROPA, descripcion: "Proceso de teñido artesanal para un estilo único." },
  { id: 13, nombre: "Cargo Color Crema", precio: 100000, categoria: "pantalones", imagen: "imagenes/pantalones/cargo-color-crema.avif", imagenSecundaria: "imagenes/pantalones/cargo-color-crema-2.avif", talles: TALLES_ROPA, descripcion: "Tela resistente con múltiples bolsillos." },
  { id: 14, nombre: "Cargo Color Marrón", precio: 105000, categoria: "pantalones", imagen: "imagenes/pantalones/cargo-color-marron.jpg", imagenSecundaria: "imagenes/pantalones/cargo-color-marron-2.jpg", talles: TALLES_ROPA, descripcion: "Cargo de corte recto y acabado mate." },
  { id: 15, nombre: "Cargo Color Negro con Puño", precio: 110000, categoria: "pantalones", imagen: "imagenes/pantalones/cargo-color-negro-con-puno.jpg", imagenSecundaria: "imagenes/pantalones/cargo-color-negro-con-puno-2.jpg", talles: TALLES_ROPA, descripcion: "Ajuste cómodo en el tobillo y costuras reforzadas." },
  { id: 16, nombre: "Cargo Color Verde Claro", precio: 115000, categoria: "pantalones", imagen: "imagenes/pantalones/cargo-color-verde-clarito.jpg", imagenSecundaria: "imagenes/pantalones/cargo-color-verde-clarito-2.jpg", talles: TALLES_ROPA, descripcion: "Estilo militar moderno en tono claro." },
  { id: 17, nombre: "Jean Azulado", precio: 120000, categoria: "pantalones", imagen: "imagenes/pantalones/jean-azulado.webp", imagenSecundaria: "imagenes/pantalones/jean-azulado-2.webp", talles: TALLES_ROPA, descripcion: "Denim de lavado oscuro y calce relajado." },
  { id: 18, nombre: "Jean Claro", precio: 122000, categoria: "pantalones", imagen: "imagenes/pantalones/jean-clarito.jpeg", imagenSecundaria: "imagenes/pantalones/jean-clarito-2.jpeg", talles: TALLES_ROPA, descripcion: "Jean con lavado claro, ideal para el verano." },
  { id: 19, nombre: "Jean Clásico", precio: 125000, categoria: "pantalones", imagen: "imagenes/pantalones/jean-clasico.jpg", imagenSecundaria: "imagenes/pantalones/jean-clasico-2.jpg", talles: TALLES_ROPA, descripcion: "Corte recto, el denim de siempre." },
  { id: 20, nombre: "Jean Desgastado", precio: 127000, categoria: "pantalones", imagen: "imagenes/pantalones/jean-desgastado.jpg", imagenSecundaria: "imagenes/pantalones/jean-desgastado-2.jpg", talles: TALLES_ROPA, descripcion: "Efecto de uso natural y cómodo." },
  { id: 21, nombre: "Jean Oscuro", precio: 130000, categoria: "pantalones", imagen: "imagenes/pantalones/jean-oscuro.jpg", imagenSecundaria: "imagenes/pantalones/jean-oscuro-2.jpg", talles: TALLES_ROPA, descripcion: "Color oscuro, denim rígido de larga duración." },
  { id: 22, nombre: "Adidas Campus Gris", precio: 165000, categoria: "zapatillas", imagen: "imagenes/zapatillas/adidas-campus-gris.webp", imagenSecundaria: "imagenes/zapatillas/adidas-campus-gris-2.webp", talles: TALLES_CALZADO, descripcion: "Clásico renovado en gamuza gris." },
  { id: 23, nombre: "Adidas Samba Clásicas Blancas", precio: 170000, categoria: "zapatillas", imagen: "imagenes/zapatillas/adidas-samba-clasicas-blancas.avif", imagenSecundaria: "imagenes/zapatillas/adidas-samba-clasicas-blancas-2.avif", talles: TALLES_CALZADO, descripcion: "Silueta icónica con detalles en cuero." },
  { id: 24, nombre: "Adidas Samba Clásicas Negras", precio: 180000, categoria: "zapatillas", imagen: "imagenes/zapatillas/adidas-samba-clasicas-negras.avif", imagenSecundaria: "imagenes/zapatillas/adidas-samba-clasicas-negras-2.avif", talles: TALLES_CALZADO, descripcion: "El modelo retro más buscado, máxima calidad." },
  { id: 25, nombre: "Adidas Campus Verdes", precio: 195000, categoria: "zapatillas", imagen: "imagenes/zapatillas/campus-verdes.avif", imagenSecundaria: "imagenes/zapatillas/campus-verdes-2.avif", talles: TALLES_CALZADO, descripcion: "Color vibrante y estilo urbano." },
  { id: 26, nombre: "Vans Knu Blanco y Negro", precio: 200000, categoria: "zapatillas", imagen: "imagenes/zapatillas/vans-knu-blanco-negro.jpg", imagenSecundaria: "imagenes/zapatillas/vans-knu-blanco-negro-2.jpg", talles: TALLES_CALZADO, descripcion: "La zapatilla de skate de los 90, máxima comodidad." },
  { id: 27, nombre: "Vans Knu Negras", precio: 210000, categoria: "zapatillas", imagen: "imagenes/zapatillas/vans-knu-negras.jpg", imagenSecundaria: "imagenes/zapatillas/vans-knu-negras-2.jpg", talles: TALLES_CALZADO, descripcion: "Suela ancha, la tendencia actual." },
];

let productoActual = null;

/**
 * Obtiene el identificador del producto indicado en la dirección de la página.
 * @method obtenerIdDeUrl
 * @return {number} Identificador del producto, o NaN si no es un número.
 */
const obtenerIdDeUrl = () => {
  const parametros = new URLSearchParams(window.location.search);
  return Number(parametros.get("id"));
};

/**
 * Busca un producto del catálogo por su identificador.
 * @method buscarProducto
 * @param {number} id - Identificador del producto.
 * @return {object|null} Producto encontrado, o null si no existe.
 */
const buscarProducto = (id) => {
  return PRODUCTOS.find((producto) => producto.id === id) || null;
};

/**
 * Cambia la imagen principal por la miniatura elegida.
 * @method cambiarImagen
 * @param {number} indice - Posición de la miniatura dentro de la galería.
 * @return {void}
 */
const cambiarImagen = (indice) => {
  const miniaturas = document.querySelectorAll("#miniaturas img");
  miniaturas.forEach((miniatura, posicion) => {
    miniatura.classList.toggle("activa", posicion === indice);
  });
  document.getElementById("imagen-principal").src = miniaturas[indice].src;
};

/**
 * Lee la cantidad ingresada y comprueba que sea un entero entre 1 y el máximo.
 * @method leerCantidad
 * @return {number|null} Cantidad ingresada, o null si el valor no es válido.
 */
const leerCantidad = () => {
  const texto = document.getElementById("cantidad").value.trim();
  if (!/^\d+$/.test(texto)) {
    return null;
  }
  const cantidad = Number(texto);
  return cantidad >= 1 && cantidad <= CANTIDAD_MAXIMA ? cantidad : null;
};

/**
 * Calcula y muestra el subtotal (precio por cantidad) del producto en pantalla.
 * @method actualizarSubtotal
 * @return {void}
 */
const actualizarSubtotal = () => {
  const cantidad = leerCantidad();
  const subtotal = document.getElementById("producto-subtotal");
  if (!productoActual || cantidad === null) {
    subtotal.textContent = "Subtotal: -";
    return;
  }
  subtotal.textContent = "Subtotal: " + formatearPrecio(productoActual.precio * cantidad);
};

/**
 * Carga en la página los datos del producto indicado en la dirección.
 * Si el producto no existe, muestra un aviso en su lugar.
 * @method mostrarProducto
 * @return {void}
 */
const mostrarProducto = () => {
  productoActual = buscarProducto(obtenerIdDeUrl());

  if (!productoActual) {
    document.getElementById("producto-detalle").classList.add("oculto");
    document.getElementById("producto-no-encontrado").classList.remove("oculto");
    return;
  }

  document.title = "CrewLab - " + productoActual.nombre;
  document.getElementById("producto-nombre").textContent = productoActual.nombre;
  document.getElementById("producto-precio").textContent = formatearPrecio(productoActual.precio);
  document.getElementById("producto-descripcion").textContent = productoActual.descripcion;

  const imagenPrincipal = document.getElementById("imagen-principal");
  imagenPrincipal.src = productoActual.imagen;
  imagenPrincipal.alt = productoActual.nombre;

  const galeria = [productoActual.imagen, productoActual.imagenSecundaria];
  document.getElementById("miniaturas").innerHTML = galeria
    .map((ruta, indice) => {
      const clase = indice === 0 ? ' class="activa"' : "";
      return `<img src="${ruta}" alt="${productoActual.nombre}, vista ${indice + 1}"${clase} onclick="cambiarImagen(${indice})">`;
    })
    .join("");

  document.getElementById("talle").innerHTML = productoActual.talles
    .map((talle) => `<option value="${talle}">${talle}</option>`)
    .join("");

  actualizarSubtotal();
};

/**
 * Valida la cantidad ingresada y agrega el producto en pantalla al carrito.
 * Si la cantidad es incorrecta avisa al usuario y blanquea el campo.
 * @method agregarProductoActual
 * @return {void}
 */
const agregarProductoActual = () => {
  const campoCantidad = document.getElementById("cantidad");
  const cantidad = leerCantidad();

  if (cantidad === null) {
    window.crewlabNotificar(`Ingresá una cantidad válida: un número entero entre 1 y ${CANTIDAD_MAXIMA}.`);
    campoCantidad.value = "";
    actualizarSubtotal();
    campoCantidad.focus();
    return;
  }

  const talle = document.getElementById("talle").value;
  agregarAlCarrito({
    nombre: `${productoActual.nombre} (talle ${talle})`,
    precio: productoActual.precio,
    cantidad: cantidad,
  });
  window.crewlabNotificar("Producto agregado al carrito.", "exito");
};
