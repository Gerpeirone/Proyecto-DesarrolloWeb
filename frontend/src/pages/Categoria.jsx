import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductos } from "@api/productosApi";
import Aviso from "@components/Aviso";
import ListaProductos from "@components/ListaProductos";
import { CATEGORIAS } from "@data/tienda";

/**
 * Página de una categoría: lista los productos de la categoría indicada en la ruta.
 * @method Categoria
 * @return {JSX.Element} Listado de productos o aviso si la categoría no existe.
 */
const Categoria = () => {
  const { categoria } = useParams();
  const encontradas = CATEGORIAS.filter((item) => item.id === categoria);
  const [productos, setProductos] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProductos(null);
    setError(false);
    obtenerProductos(categoria)
      .then((datos) => setProductos(datos))
      .catch(() => setError(true));
  }, [categoria]);

  if (encontradas.length === 0) {
    return (
      <Aviso
        titulo="Categoría no encontrada"
        texto="La categoría que buscás no existe."
        destino="/"
        etiqueta="Volver al inicio"
      />
    );
  }

  return (
    <>
      <h2>{encontradas[0].nombre}</h2>
      <ListaProductos productos={productos} error={error} />
    </>
  );
};

export default Categoria;
