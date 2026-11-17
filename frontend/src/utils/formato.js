/**
 * Da formato de moneda argentina a un número, sin decimales.
 * @method formatearPrecio
 * @param {number} valor - Importe a mostrar.
 * @return {string} Importe con el signo $ y separador de miles.
 */
export const formatearPrecio = (valor) => {
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
  return formato.format(valor);
};
