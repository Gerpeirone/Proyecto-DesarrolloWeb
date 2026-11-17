import ProductoCard from "@components/ProductoCard";

/**
 * Grilla de productos; mientras se consulta la API muestra un aviso de carga
 * y si la consulta falla muestra un mensaje de error.
 * @method ListaProductos
 * @param {object} props - Propiedades del componente.
 * @param {Array<object>|null} props.productos - Productos a mostrar; null mientras se están cargando.
 * @param {boolean} props.error - Indica si la consulta falló.
 * @return {JSX.Element} Listado de tarjetas o mensaje de estado.
 */
const ListaProductos = ({ productos, error }) => {
  if (error) {
    return (
      <p className="estado estado-error">
        No pudimos cargar los productos. Revisá que el servicio esté en ejecución e intentá de nuevo.
      </p>
    );
  }

  if (productos === null) {
    return <p className="estado">Cargando productos...</p>;
  }

  if (productos.length === 0) {
    return <p className="estado">No hay productos para mostrar.</p>;
  }

  return (
    <section className="productos">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </section>
  );
};

export default ListaProductos;
