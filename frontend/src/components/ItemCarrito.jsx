import { formatearPrecio } from "@utils/formato";
import { obtenerImagen } from "@utils/imagenes";

/**
 * Fila del carrito con los datos de un producto y sus controles.
 * @method ItemCarrito
 * @param {object} props - Propiedades del componente.
 * @param {object} props.item - Producto del carrito.
 * @param {Function} props.alCambiarCantidad - Recibe el id y las unidades a sumar o restar.
 * @param {Function} props.alEliminar - Recibe el id del producto a quitar.
 * @return {JSX.Element} Fila con imagen, nombre, importe y botones.
 */
const ItemCarrito = ({ item, alCambiarCantidad, alEliminar }) => {
  /**
   * Resta una unidad del producto.
   * @method restar
   * @return {void}
   */
  const restar = () => {
    alCambiarCantidad(item.id, -1);
  };

  /**
   * Suma una unidad del producto.
   * @method sumar
   * @return {void}
   */
  const sumar = () => {
    alCambiarCantidad(item.id, 1);
  };

  /**
   * Quita el producto del carrito.
   * @method eliminar
   * @return {void}
   */
  const eliminar = () => {
    alEliminar(item.id);
  };

  return (
    <li className="carrito-item">
      <img src={obtenerImagen(item.imagen)} alt={item.nombre} />
      <div className="item-info">
        <h3>{item.nombre}</h3>
        <p>
          {formatearPrecio(item.precio)} x {item.cantidad} ={" "}
          <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
        </p>
      </div>
      <div className="item-controles">
        <button type="button" aria-label="Restar una unidad" onClick={restar}>
          -
        </button>
        <span className="item-cantidad">{item.cantidad}</span>
        <button type="button" aria-label="Sumar una unidad" onClick={sumar}>
          +
        </button>
        <button type="button" className="boton-eliminar" onClick={eliminar}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default ItemCarrito;
