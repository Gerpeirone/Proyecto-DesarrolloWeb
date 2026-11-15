import { useNavigate, useOutletContext } from "react-router-dom";
import Aviso from "@components/Aviso";
import ItemCarrito from "@components/ItemCarrito";
import { calcularSubtotal } from "@utils/carrito";
import { formatearPrecio } from "@utils/formato";
import { useTitulo } from "@utils/hooks";

/**
 * Página del carrito: lista los productos elegidos, permite cambiar cantidades,
 * eliminar productos, vaciar el carrito y continuar con la compra.
 * @method Carrito
 * @return {JSX.Element} Contenido del carrito o aviso si está vacío.
 */
const Carrito = () => {
  const { carrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito } = useOutletContext();
  const navigate = useNavigate();

  useTitulo("Carrito");

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
            alEliminar={eliminarDelCarrito}
          />
        ))}
      </ul>

      <p className="carrito-total">Total: {formatearPrecio(calcularSubtotal(carrito))}</p>

      <div className="carrito-botones">
        <button type="button" className="boton-secundario" onClick={vaciarCarrito}>
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
