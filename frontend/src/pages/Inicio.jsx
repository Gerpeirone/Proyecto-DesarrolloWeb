import { useEffect, useState } from "react";
import { obtenerProductos } from "@api/productosApi";
import Carrusel from "@components/Carrusel";
import ListaProductos from "@components/ListaProductos";
import { REDES } from "@data/tienda";

/**
 * Página de inicio: promociones, productos más vendidos y datos de la tienda.
 * @method Inicio
 * @return {JSX.Element} Contenido de la página principal.
 */
const Inicio = () => {
  const [productos, setProductos] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerProductos()
      .then((datos) => setProductos(datos.filter((producto) => producto.destacado)))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <Carrusel />

      <h2>Productos más vendidos</h2>
      <ListaProductos productos={productos} error={error} />

      <section className="sobre-nosotros">
        <h2>Sobre nosotros</h2>
        <p>En CrewLab nos apasiona la moda urbana y la comodidad.</p>
        <p>
          Diseñamos y seleccionamos prendas de alta calidad para que te sientas único en tu estilo.
        </p>
        <div className="redes">
          {REDES.map((red) => (
            <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer">
              <img src={red.imagen} alt={`${red.nombre} de CrewLab`} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default Inicio;
