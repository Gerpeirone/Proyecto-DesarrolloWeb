import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import {
  agregarItem,
  cambiarCantidadItem,
  contarArticulos,
  guardarCarrito,
  leerCarrito,
  quitarItem,
} from "@utils/carrito";

/**
 * Componente principal: muestra el encabezado, el pie y, entre ambos,
 * la página de la ruta hija activa. Además administra el carrito y lo
 * comparte con las páginas a través del contexto del Outlet.
 * @method Layout
 * @return {JSX.Element} Estructura general del sitio.
 */
const Layout = () => {
  const [carrito, setCarrito] = useState(leerCarrito);

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  /**
   * Agrega un producto al carrito.
   * @method agregarAlCarrito
   * @param {object} item - Producto a agregar, con id, nombre, precio y cantidad.
   * @return {void}
   */
  const agregarAlCarrito = (item) => {
    setCarrito((actual) => agregarItem(actual, item));
  };

  /**
   * Suma o resta unidades de un producto del carrito.
   * @method cambiarCantidad
   * @param {string} id - Identificador del producto dentro del carrito.
   * @param {number} variacion - Unidades a sumar o restar.
   * @return {void}
   */
  const cambiarCantidad = (id, variacion) => {
    setCarrito((actual) => cambiarCantidadItem(actual, id, variacion));
  };

  /**
   * Quita un producto del carrito.
   * @method eliminarDelCarrito
   * @param {string} id - Identificador del producto dentro del carrito.
   * @return {void}
   */
  const eliminarDelCarrito = (id) => {
    setCarrito((actual) => quitarItem(actual, id));
  };

  /**
   * Elimina todos los productos del carrito.
   * @method vaciarCarrito
   * @return {void}
   */
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <div className="pagina">
      <Header cantidad={contarArticulos(carrito)} />
      <main>
        <Outlet
          context={{ carrito, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
