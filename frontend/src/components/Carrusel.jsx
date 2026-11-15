import { PROMOCIONES } from "@data/tienda";
import { obtenerImagen } from "@utils/imagenes";

/**
 * Carrusel de promociones de la página de inicio.
 * @method Carrusel
 * @return {JSX.Element} Imágenes de las promociones vigentes.
 */
const Carrusel = () => {
  return (
    <section className="carrusel" aria-label="Ofertas destacadas">
      <div className="slides">
        {PROMOCIONES.map((promocion) => (
          <img key={promocion.imagen} src={obtenerImagen(promocion.imagen)} alt={promocion.texto} />
        ))}
      </div>
    </section>
  );
};

export default Carrusel;
