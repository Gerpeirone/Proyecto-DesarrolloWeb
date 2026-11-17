import datos from "@data/productos.json";

const URL_API = import.meta.env.VITE_API_URL;

/**
 * Pide datos al servicio simulado (json-server).
 * @method pedirAlServicio
 * @param {string} ruta - Ruta a consultar, por ejemplo "/productos?categoria=remeras".
 * @return {Promise<object|Array<object>>} Datos recibidos.
 */
const pedirAlServicio = async (ruta) => {
  const respuesta = await fetch(`${URL_API}${ruta}`);
  if (!respuesta.ok) {
    throw new Error("No se pudo consultar el servicio de productos.");
  }
  return respuesta.json();
};

/**
 * Obtiene los productos del catálogo, opcionalmente filtrados por categoría.
 * Usa el servicio simulado si está configurado; si no, los datos locales.
 * @method obtenerProductos
 * @param {string} [categoria] - Identificador de la categoría a filtrar.
 * @return {Promise<Array<object>>} Lista de productos.
 */
export const obtenerProductos = async (categoria) => {
  if (URL_API) {
    return pedirAlServicio(categoria ? `/productos?categoria=${categoria}` : "/productos");
  }
  return categoria
    ? datos.productos.filter((producto) => producto.categoria === categoria)
    : datos.productos;
};

/**
 * Obtiene un producto del catálogo por su identificador.
 * @method obtenerProductoPorId
 * @param {string} id - Identificador del producto, tomado de la dirección.
 * @return {Promise<object|null>} Producto encontrado, o null si no existe.
 */
export const obtenerProductoPorId = async (id) => {
  const productos = await obtenerProductos();
  const encontrados = productos.filter((producto) => Number(producto.id) === Number(id));
  return encontrados.length > 0 ? encontrados[0] : null;
};
