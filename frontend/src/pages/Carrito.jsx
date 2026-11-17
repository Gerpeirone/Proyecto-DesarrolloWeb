import { useNavigate, useOutletContext } from "react-router-dom";
import Aviso from "@components/Aviso";
import ItemCarrito from "@components/ItemCarrito";
import { calcularSubtotal } from "@utils/carrito";
import { formatearPrecio } from "@utils/formato";

/**
 * Página del carrito: lista los productos elegidos, permite cambiar cantidades,
 * eliminar productos, vaciar el carrito y continuar con la compra.
 * @method Carrito
 * @return {JSX.Element} Contenido del carrito o aviso si está vacío.
 */
const Carrito = () => {
  const { carrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, pedirConfirmacion } =
    useOutletContext();
  const navigate = useNavigate();

  /**
   * Pregunta si se quiere quitar un producto y, si el usuario confirma, lo quita del carrito.
   * @method confirmarEliminar
   * @param {string} id - Identificador del producto dentro del carrito.
   * @return {void}
   */
  const confirmarEliminar = (id) => {
    const item = carrito.filter((producto) => producto.id === id)[0];
    pedirConfirmacion(`¿Querés quitar "${item.nombre}" del carrito?`, "Eliminar", () =>
      eliminarDelCarrito(id)
    );
  };

  /**
   * Pregunta si se quiere vaciar el carrito y, si el usuario confirma, lo vacía.
   * @method confirmarVaciar
   * @return {void}
   */
  const confirmarVaciar = () => {
    pedirConfirmacion("Se van a quitar todos los productos del carrito.", "Vaciar carrito", vaciarCarrito);
  };

  /**
   * Lleva a la página para finalizar la compra.
   * @method irAlCheckout
   * @return {void}
   */
  const irAlCheckout = () => {
    navigate("/checkout");
  };

  if (carrito.length === 0) {
    return (
      <Aviso
        titulo="Tu carrito está vacío"
        texto="Agregá un producto para poder continuar con la compra."
        destino="/"
        etiqueta="Ver productos"
      />
    );
  }

  return (
    <div className="carrito-contenedor">
      <h2>Tu carrito</h2>

      <ul className="carrito-lista">
        {carrito.map((item) => (
          <ItemCarrito
            key={item.id}
            item={item}
            alCambiarCantidad={cambiarCantidad}
            alEliminar={confirmarEliminar}
          />
        ))}
      </ul>

      <p className="carrito-total">Total: {formatearPrecio(calcularSubtotal(carrito))}</p>

      <div className="carrito-botones">
        <button type="button" className="boton-secundario" onClick={confirmarVaciar}>
          Vaciar carrito
        </button>
        <button type="button" className="boton-confirmar" onClick={irAlCheckout}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Carrito;
