import Aviso from "@components/Aviso";
import { useTitulo } from "@utils/hooks";

/**
 * Página que se muestra cuando la ruta no existe.
 * @method NoEncontrado
 * @return {JSX.Element} Aviso con un enlace al inicio.
 */
const NoEncontrado = () => {
  useTitulo("Página no encontrada");

  return (
    <Aviso
      titulo="Página no encontrada"
      texto="La dirección que ingresaste no existe."
      destino="/"
      etiqueta="Volver al inicio"
    />
  );
};

export default NoEncontrado;
