import { obtenerProductos } from "@api/productosApi";
import Carrusel from "@components/Carrusel";
import ListaProductos from "@components/ListaProductos";
import { REDES } from "@data/tienda";
import { useConsulta, useTitulo } from "@utils/hooks";
import { obtenerImagen } from "@utils/imagenes";

/**
 * Página de inicio: promociones, productos más vendidos y datos de la tienda.
 * @method Inicio
 * @return {JSX.Element} Contenido de la página principal.
 */
const Inicio = () => {
  const { datos, cargando, error } = useConsulta(obtenerProductos);
  const destacados = datos ? datos.filter((producto) => producto.destacado) : [];

  useTitulo("Inicio");

  return (
    <>
      <Carrusel />

      <h2>Productos más vendidos</h2>
      <ListaProductos productos={destacados} cargando={cargando} error={error} />

      <section className="sobre-nosotros">
        <h2>Sobre nosotros</h2>
        <p>En CrewLab nos apasiona la moda urbana y la comodidad.</p>
        <p>
          Diseñamos y seleccionamos prendas de alta calidad para que te sientas único en tu estilo.
        </p>
        <div className="redes">
          {REDES.map((red) => (
            <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer">
              <img src={obtenerImagen(red.imagen)} alt={`${red.nombre} de CrewLab`} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default Inicio;
