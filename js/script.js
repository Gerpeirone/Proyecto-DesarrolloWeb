"use strict";

const CLAVE_CARRITO = "crewlab_carrito";
const CANTIDAD_MAXIMA = 10;

/**
 * Da formato de moneda argentina a un número.
 * @method formatearPrecio
 * @param {number} valor - Importe a mostrar.
 * @return {string} Importe con el signo $ y separador de miles.
 */
const formatearPrecio = (valor) => {
  return "$" + valor.toLocaleString("es-AR");
};

/**
 * Indica si un elemento guardado en el carrito tiene datos correctos.
 * @method esItemValido
 * @param {object} item - Elemento leído desde el almacenamiento.
 * @return {boolean} true si tiene nombre, precio y cantidad válidos.
 */
const esItemValido = (item) => {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.nombre === "string" &&
    item.nombre !== "" &&
    Number.isFinite(item.precio) &&
    item.precio > 0 &&
    Number.isInteger(item.cantidad) &&
    item.cantidad > 0
  );
};

/**
 * Lee el carrito guardado en el navegador y descarta los datos inválidos.
 * @method leerCarrito
 * @return {Array<{nombre: string, precio: number, cantidad: number}>} Productos del carrito.
 */
const leerCarrito = () => {
  let guardado;
  try {
    guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
  } catch (error) {
    guardado = null;
  }
  return Array.isArray(guardado) ? guardado.filter(esItemValido) : [];
};

/**
 * Calcula la suma de precio por cantidad de todos los productos.
 * @method calcularSubtotal
 * @param {Array<{precio: number, cantidad: number}>} carrito - Productos del carrito.
 * @return {number} Importe total de los productos.
 */
const calcularSubtotal = (carrito) => {
  return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
};

/**
 * Muestra en el encabezado la cantidad de artículos del carrito.
 * @method actualizarContador
 * @return {void}
 */
const actualizarContador = () => {
  const contador = document.getElementById("carrito-contador");
  if (!contador) {
    return;
  }
  const cantidad = leerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
  contador.textContent = cantidad > 0 ? String(cantidad) : "";
};

/**
 * Guarda el carrito en el navegador y actualiza el contador del encabezado.
 * @method guardarCarrito
 * @param {Array<{nombre: string, precio: number, cantidad: number}>} carrito - Productos a guardar.
 * @return {void}
 */
const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContador();
};

/**
 * Dibuja la lista de productos y el total dentro de la ventana del carrito.
 * @method dibujarCarrito
 * @return {void}
 */
const dibujarCarrito = () => {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");
  if (!lista || !total) {
    return;
  }

  const carrito = leerCarrito();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = '<li class="carrito-vacio">Tu carrito está vacío.</li>';
  }

  carrito.forEach((item, indice) => {
    const fila = document.createElement("li");
    fila.className = "carrito-item";
    fila.innerHTML = `
      <span class="item-info"></span>
      <span class="item-controles">
        <button type="button" onclick="cambiarCantidad(${indice}, -1)" aria-label="Restar una unidad">-</button>
        <span class="item-cantidad">${item.cantidad}</span>
        <button type="button" onclick="cambiarCantidad(${indice}, 1)" aria-label="Sumar una unidad">+</button>
        <button type="button" class="boton-eliminar" onclick="eliminarDelCarrito(${indice})" aria-label="Eliminar del carrito">✕</button>
      </span>`;
    fila.querySelector(".item-info").textContent =
      `${item.nombre} - ${formatearPrecio(item.precio * item.cantidad)}`;
    lista.appendChild(fila);
  });

  total.textContent = "Total: " + formatearPrecio(calcularSubtotal(carrito));
};

/**
 * Agrega un producto al carrito; si ya estaba, suma la cantidad sin superar el máximo.
 * @method agregarAlCarrito
 * @param {{nombre: string, precio: number, cantidad: number}} item - Producto a agregar.
 * @return {void}
 */
const agregarAlCarrito = (item) => {
  const carrito = leerCarrito();
  const existente = carrito.find((guardado) => guardado.nombre === item.nombre);

  if (existente) {
    existente.cantidad = Math.min(CANTIDAD_MAXIMA, existente.cantidad + item.cantidad);
  } else {
    carrito.push(item);
  }

  guardarCarrito(carrito);
  dibujarCarrito();
};

/**
 * Suma o resta unidades de un producto del carrito, entre 1 y el máximo permitido.
 * @method cambiarCantidad
 * @param {number} indice - Posición del producto dentro del carrito.
 * @param {number} variacion - Unidades a sumar (positivo) o restar (negativo).
 * @return {void}
 */
const cambiarCantidad = (indice, variacion) => {
  const carrito = leerCarrito();
  if (!carrito[indice]) {
    return;
  }
  const nuevaCantidad = carrito[indice].cantidad + variacion;
  carrito[indice].cantidad = Math.min(CANTIDAD_MAXIMA, Math.max(1, nuevaCantidad));
  guardarCarrito(carrito);
  dibujarCarrito();
};

/**
 * Quita un producto del carrito.
 * @method eliminarDelCarrito
 * @param {number} indice - Posición del producto dentro del carrito.
 * @return {void}
 */
const eliminarDelCarrito = (indice) => {
  const carrito = leerCarrito();
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  dibujarCarrito();
};

/**
 * Elimina todos los productos del carrito.
 * @method vaciarCarrito
 * @return {void}
 */
const vaciarCarrito = () => {
  guardarCarrito([]);
  dibujarCarrito();
};

/**
 * Oculta la ventana del carrito.
 * @method cerrarCarrito
 * @return {void}
 */
const cerrarCarrito = () => {
  const ventana = document.getElementById("carrito-modal");
  if (ventana) {
    ventana.classList.add("oculto");
  }
};

/**
 * Muestra u oculta la ventana del carrito con su contenido actualizado.
 * @method alternarCarrito
 * @return {void}
 */
const alternarCarrito = () => {
  const ventana = document.getElementById("carrito-modal");
  if (!ventana) {
    return;
  }
  dibujarCarrito();
  ventana.classList.toggle("oculto");
};

/**
 * Cierra el menú de navegación.
 * @method cerrarMenu
 * @return {void}
 */
const cerrarMenu = () => {
  document.getElementById("menu").classList.remove("activo");
  document.getElementById("menu-boton").setAttribute("aria-expanded", "false");
};

/**
 * Abre o cierra el menú de navegación.
 * @method alternarMenu
 * @return {void}
 */
const alternarMenu = () => {
  const abierto = document.getElementById("menu").classList.toggle("activo");
  document.getElementById("menu-boton").setAttribute("aria-expanded", String(abierto));
};

/**
 * Cierra el menú y el carrito cuando se presiona la tecla Escape.
 * @method cerrarConEscape
 * @param {KeyboardEvent} evento - Evento de teclado recibido por la página.
 * @return {void}
 */
const cerrarConEscape = (evento) => {
  if (evento.key === "Escape") {
    cerrarMenu();
    cerrarCarrito();
  }
};

/**
 * Lleva a la página de compra si el carrito tiene productos; si no, avisa al usuario.
 * @method irAlCheckout
 * @return {void}
 */
const irAlCheckout = () => {
  if (leerCarrito().length === 0) {
    window.crewlabNotificar("Tu carrito está vacío. Agregá un producto antes de continuar.");
    return;
  }
  window.location.href = "checkout.html";
};

/**
 * Prepara la página al cargar: muestra la cantidad de artículos del carrito.
 * @method iniciarPagina
 * @return {void}
 */
const iniciarPagina = () => {
  actualizarContador();
};
