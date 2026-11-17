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
    item.id !== undefined &&
    item.nombre !== undefined &&
    item.precio > 0 &&
    item.cantidad > 0
  );
};

/**
 * Lee el carrito guardado en el navegador y descarta los datos inválidos.
 * @method leerCarrito
 * @return {Array<object>} Productos del carrito.
 */
export const leerCarrito = () => {
  const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
  if (guardado === null) {
    return [];
  }
  return guardado.filter(esItemValido);
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
 * Deja una cantidad dentro del rango permitido, entre 1 y el máximo por producto.
 * @method ajustarCantidad
 * @param {number} cantidad - Cantidad pedida.
 * @return {number} Cantidad dentro del rango permitido.
 */
const ajustarCantidad = (cantidad) => {
  if (cantidad < 1) {
    return 1;
  }
  if (cantidad > CANTIDAD_MAXIMA) {
    return CANTIDAD_MAXIMA;
  }
  return cantidad;
};

/**
 * Agrega un producto al carrito; si ya estaba, suma la cantidad.
 * @method agregarItem
 * @param {Array<object>} carrito - Carrito actual.
 * @param {object} item - Producto a agregar, con id, nombre, precio y cantidad.
 * @return {Array<object>} Nuevo carrito con el producto agregado.
 */
export const agregarItem = (carrito, item) => {
  const existentes = carrito.filter((guardado) => guardado.id === item.id);
  if (existentes.length === 0) {
    return [...carrito, item];
  }
  return carrito.map((guardado) =>
    guardado.id === item.id
      ? { ...guardado, cantidad: ajustarCantidad(guardado.cantidad + item.cantidad) }
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
    item.id === id ? { ...item, cantidad: ajustarCantidad(item.cantidad + variacion) } : item
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
  let suma = 0;
  carrito.forEach((item) => {
    suma += item.precio * item.cantidad;
  });
  return suma;
};

/**
 * Cuenta las unidades que hay en el carrito.
 * @method contarArticulos
 * @param {Array<{cantidad: number}>} carrito - Productos del carrito.
 * @return {number} Cantidad total de unidades.
 */
export const contarArticulos = (carrito) => {
  let cantidad = 0;
  carrito.forEach((item) => {
    cantidad += item.cantidad;
  });
  return cantidad;
};

/**
 * Calcula el costo de envío; si no hay productos el envío no tiene costo.
 * @method calcularEnvio
 * @param {string} metodo - Identificador del método de envío.
 * @param {number} subtotal - Importe de los productos del carrito.
 * @return {number} Costo del envío.
 */
export const calcularEnvio = (metodo, subtotal) => {
  const elegidos = METODOS_ENVIO.filter((envio) => envio.id === metodo);
  return subtotal > 0 && elegidos.length > 0 ? elegidos[0].costo : 0;
};
