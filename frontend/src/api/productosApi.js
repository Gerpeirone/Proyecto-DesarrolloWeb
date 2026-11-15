import productosLocales from "@data/productos.json";

const URL_API = import.meta.env.VITE_API_URL;

/**
 * Pide una lista de productos al servicio simulado.
 * @method pedirProductos
 * @param {string} filtro - Parámetros de búsqueda, por ejemplo "?categoria=remeras".
 * @return {Promise<Array<object>>} Productos recibidos.
 */
const pedirProductos = async (filtro) => {
  const respuesta = await fetch(`${URL_API}/productos${filtro}`);
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
    return pedirProductos(categoria ? `?categoria=${categoria}` : "");
  }
  return categoria
    ? productosLocales.filter((producto) => producto.categoria === categoria)
    : productosLocales;
};

/**
 * Obtiene un producto del catálogo por su identificador.
 * @method obtenerProductoPorId
 * @param {number} id - Identificador del producto.
 * @return {Promise<object|null>} Producto encontrado, o null si no existe.
 */
export const obtenerProductoPorId = async (id) => {
  if (!Number.isInteger(id)) {
    return null;
  }
  const productos = URL_API
    ? await pedirProductos(`?id=${id}`)
    : productosLocales.filter((producto) => producto.id === id);
  return productos[0] || null;
};
