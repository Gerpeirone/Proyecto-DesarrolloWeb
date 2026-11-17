import { Link } from "react-router-dom";

/**
 * Mensaje centrado con un enlace para seguir navegando.
 * @method Aviso
 * @param {object} props - Propiedades del componente.
 * @param {string} props.titulo - Título del mensaje.
 * @param {string} props.texto - Explicación para el usuario.
 * @param {string} props.destino - Ruta a la que lleva el enlace, por ejemplo "/".
 * @param {string} props.etiqueta - Texto del enlace.
 * @return {JSX.Element} Bloque con el mensaje y el enlace.
 */
const Aviso = ({ titulo, texto, destino, etiqueta }) => {
  return (
    <div className="aviso">
      <h2>{titulo}</h2>
      <p>{texto}</p>
      <Link to={destino} className="ver-mas">
        {etiqueta}
      </Link>
    </div>
  );
};

export default Aviso;
