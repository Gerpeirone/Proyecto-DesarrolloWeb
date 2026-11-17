import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import VentanaAviso from "@components/VentanaAviso";
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
  const [aviso, setAviso] = useState(null);

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

  /**
   * Muestra un mensaje al usuario en la ventana de aviso.
   * @method mostrarAviso
   * @param {string} texto - Mensaje para el usuario.
   * @param {string} tipo - "error" para un problema o "exito" para una acción realizada.
   * @return {void}
   */
  const mostrarAviso = (texto, tipo = "error") => {
    setAviso({ texto, tipo, textoBoton: "Aceptar", alConfirmar: null });
  };

  /**
   * Pregunta al usuario si quiere realizar una acción que no se puede deshacer.
   * La acción solo se ejecuta si elige el botón de confirmar.
   * @method pedirConfirmacion
   * @param {string} texto - Pregunta para el usuario.
   * @param {string} textoBoton - Texto del botón que confirma la acción.
   * @param {Function} accion - Función que se ejecuta si el usuario confirma.
   * @return {void}
   */
  const pedirConfirmacion = (texto, textoBoton, accion) => {
    setAviso({ texto, tipo: "confirmar", textoBoton, alConfirmar: accion });
  };

  /**
   * Responde al aviso actual: si el usuario confirmó una pregunta, realiza la acción,
   * y después cierra la ventana.
   * @method responderAviso
   * @param {boolean} confirmado - true si eligió el botón principal, false si eligió Cancelar.
   * @return {void}
   */
  const responderAviso = (confirmado) => {
    if (confirmado && aviso.alConfirmar !== null) {
      aviso.alConfirmar();
    }
    document.getElementById("aviso").close();
  };

  /**
   * Quita el aviso actual cuando la ventana se cierra.
   * @method cerrarAviso
   * @return {void}
   */
  const cerrarAviso = () => {
    setAviso(null);
  };

  return (
    <div className="pagina">
      <Header cantidad={contarArticulos(carrito)} />
      <main>
        <Outlet
          context={{
            carrito,
            agregarAlCarrito,
            cambiarCantidad,
            eliminarDelCarrito,
            vaciarCarrito,
            mostrarAviso,
            pedirConfirmacion,
          }}
        />
      </main>
      <Footer />
      <VentanaAviso aviso={aviso} alResponder={responderAviso} alCerrar={cerrarAviso} />
    </div>
  );
};

export default Layout;
