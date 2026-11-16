import { CANTIDAD_MAXIMA, METODOS_ENVIO } from "@data/tienda";

const CLAVE_CARRITO = "crewlab_carrito_react";

/**
 * Indica si un elemento guardado en el carrito tiene datos correctos.
 * @method esItemValido
 * @param {object} item - Elemento leído desde el almacenamiento.
 * @return {boolean} true si tiene identificador, nombre, precio y cantidad válidos.
 */
const esItemValido = (item) => {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.nombre === "string" &&
    Number.isFinite(item.precio) &&
    item.precio > 0 &&
    Number.isInteger(item.cantidad) &&
    item.cantidad > 0
  );
};

/**
 * Lee el carrito guardado en el navegador y descarta los datos inválidos.
 * @method leerCarrito
 * @return {Array<object>} Productos del carrito.
 */
export const leerCarrito = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");
    return Array.isArray(guardado) ? guardado.filter(esItemValido) : [];
  } catch {
    return [];
  }
};

/**
 * Guarda el carrito en el navegador para conservarlo al recargar la página.
 * @method guardarCarrito
 * @param {Array<object>} carrito - Productos a guardar.
 * @return {void}
 */
export const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};

/**
 * Limita una cantidad al rango permitido, entre 1 y el máximo por producto.
 * @method limitarCantidad
 * @param {number} cantidad - Cantidad solicitada.
 * @return {number} Cantidad dentro del rango permitido.
 */
const limitarCantidad = (cantidad) => {
  return Math.min(CANTIDAD_MAXIMA, Math.max(1, cantidad));
};

/**
 * Agrega un producto al carrito; si ya estaba, suma la cantidad.
 * @method agregarItem
 * @param {Array<object>} carrito - Carrito actual.
 * @param {object} item - Producto a agregar, con id, nombre, precio y cantidad.
 * @return {Array<object>} Nuevo carrito con el producto agregado.
 */
export const agregarItem = (carrito, item) => {
  const existe = carrito.some((guardado) => guardado.id === item.id);
  if (!existe) {
    return [...carrito, item];
  }
  return carrito.map((guardado) =>
    guardado.id === item.id
      ? { ...guardado, cantidad: limitarCantidad(guardado.cantidad + item.cantidad) }
      : guardado
  );
};

/**
 * Suma o resta unidades de un producto del carrito.
 * @method cambiarCantidadItem
 * @param {Array<object>} carrito - Carrito actual.
 * @param {string} id - Identificador del producto dentro del carrito.
 * @param {number} variacion - Unidades a sumar (positivo) o restar (negativo).
 * @return {Array<object>} Nuevo carrito con la cantidad actualizada.
 */
export const cambiarCantidadItem = (carrito, id, variacion) => {
  return carrito.map((item) =>
    item.id === id ? { ...item, cantidad: limitarCantidad(item.cantidad + variacion) } : item
  );
};

/**
 * Quita un producto del carrito.
 * @method quitarItem
 * @param {Array<object>} carrito - Carrito actual.
 * @param {string} id - Identificador del producto dentro del carrito.
 * @return {Array<object>} Nuevo carrito sin ese producto.
 */
export const quitarItem = (carrito, id) => {
  return carrito.filter((item) => item.id !== id);
};

/**
 * Calcula la suma de precio por cantidad de todos los productos.
 * @method calcularSubtotal
 * @param {Array<{precio: number, cantidad: number}>} carrito - Productos del carrito.
 * @return {number} Importe total de los productos.
 */
export const calcularSubtotal = (carrito) => {
  return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
};

/**
 * Cuenta las unidades que hay en el carrito.
 * @method contarArticulos
 * @param {Array<{cantidad: number}>} carrito - Productos del carrito.
 * @return {number} Cantidad total de unidades.
 */
export const contarArticulos = (carrito) => {
  return carrito.reduce((suma, item) => suma + item.cantidad, 0);
};

/**
 * Calcula el costo de envío; si no hay productos el envío no tiene costo.
 * @method calcularEnvio
 * @param {string} metodo - Identificador del método de envío.
 * @param {number} subtotal - Importe de los productos del carrito.
 * @return {number} Costo del envío.
 */
export const calcularEnvio = (metodo, subtotal) => {
  const elegido = METODOS_ENVIO.find((envio) => envio.id === metodo);
  return subtotal > 0 && elegido ? elegido.costo : 0;
};
