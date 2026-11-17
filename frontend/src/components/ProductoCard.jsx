import { Link } from "react-router-dom";
import { formatearPrecio } from "@utils/formato";

/**
 * Tarjeta de un producto para los listados.
 * @method ProductoCard
 * @param {object} props - Propiedades del componente.
 * @param {object} props.producto - Producto a mostrar.
 * @return {JSX.Element} Tarjeta con imágenes, nombre, precio y enlace al detalle.
 */
const ProductoCard = ({ producto }) => {
  return (
    <article className="producto">
      <div className="producto-img">
        <img src={producto.imagen} alt={producto.nombre} className="img-principal" />
        <img
          src={producto.imagenSecundaria}
          alt={`${producto.nombre}, segunda vista`}
          className="img-hover"
        />
      </div>
      <h3>{producto.nombre}</h3>
      <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
      <Link to={`/producto/${producto.id}`} className="ver-mas">
        Ver más
      </Link>
    </article>
  );
};

export default ProductoCard;
