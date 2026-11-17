import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { obtenerProductoPorId } from "@api/productosApi";
import Aviso from "@components/Aviso";
import FichaProducto from "@components/FichaProducto";

/**
 * Página de detalle: busca el producto indicado en la ruta y muestra su ficha.
 * @method ProductoDetalle
 * @return {JSX.Element} Ficha del producto o aviso si no existe.
 */
const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito, mostrarAviso } = useOutletContext();
  const [producto, setProducto] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProducto(undefined);
    setError(false);
    obtenerProductoPorId(id)
      .then((datos) => setProducto(datos))
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <p className="estado estado-error">
        No pudimos cargar el producto. Revisá que el servicio esté en ejecución e intentá de nuevo.
      </p>
    );
  }

  if (producto === undefined) {
    return <p className="estado">Cargando producto...</p>;
  }

  if (producto === null) {
    return (
      <Aviso
        titulo="Producto no encontrado"
        texto="El producto que buscás no existe o ya no está disponible."
        destino="/"
        etiqueta="Volver al inicio"
      />
    );
  }

  return (
    <FichaProducto
      key={producto.id}
      producto={producto}
      alAgregar={agregarAlCarrito}
      alAvisar={mostrarAviso}
    />
  );
};

export default ProductoDetalle;
