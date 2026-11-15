import { useOutletContext, useParams } from "react-router-dom";
import { obtenerProductoPorId } from "@api/productosApi";
import Aviso from "@components/Aviso";
import FichaProducto from "@components/FichaProducto";
import { useConsulta, useTitulo } from "@utils/hooks";

/**
 * Página de detalle: busca el producto indicado en la ruta y muestra su ficha.
 * @method ProductoDetalle
 * @return {JSX.Element} Ficha del producto o aviso si no existe.
 */
const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useOutletContext();
  const { datos: producto, cargando, error } = useConsulta(obtenerProductoPorId, Number(id));

  useTitulo(producto ? producto.nombre : "Detalle del producto");

  if (cargando) {
    return <p className="estado">Cargando producto...</p>;
  }

  if (error) {
    return (
      <p className="estado estado-error">
        No pudimos cargar el producto. Revisá que el servicio esté en ejecución e intentá de nuevo.
      </p>
    );
  }

  if (!producto) {
    return (
      <Aviso
        titulo="Producto no encontrado"
        texto="El producto que buscás no existe o ya no está disponible."
        destino="/"
        etiqueta="Volver al inicio"
      />
    );
  }

  return <FichaProducto key={producto.id} producto={producto} alAgregar={agregarAlCarrito} />;
};

export default ProductoDetalle;
