import { useParams } from "react-router-dom";
import { obtenerProductos } from "@api/productosApi";
import Aviso from "@components/Aviso";
import ListaProductos from "@components/ListaProductos";
import { CATEGORIAS } from "@data/tienda";
import { useConsulta, useTitulo } from "@utils/hooks";

/**
 * Página de una categoría: lista los productos de la categoría indicada en la ruta.
 * @method Categoria
 * @return {JSX.Element} Listado de productos o aviso si la categoría no existe.
 */
const Categoria = () => {
  const { categoria } = useParams();
  const actual = CATEGORIAS.find((item) => item.id === categoria);
  const { datos, cargando, error } = useConsulta(obtenerProductos, categoria);

  useTitulo(actual ? actual.nombre : "Categoría no encontrada");

  if (!actual) {
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
      <h2>{actual.nombre}</h2>
      <ListaProductos productos={datos} cargando={cargando} error={error} />
    </>
  );
};

export default Categoria;
