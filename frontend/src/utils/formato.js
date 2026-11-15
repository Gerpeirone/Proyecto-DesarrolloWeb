/**
 * Da formato de moneda argentina a un número.
 * @method formatearPrecio
 * @param {number} valor - Importe a mostrar.
 * @return {string} Importe con el signo $ y separador de miles.
 */
export const formatearPrecio = (valor) => {
  return "$" + valor.toLocaleString("es-AR");
};
