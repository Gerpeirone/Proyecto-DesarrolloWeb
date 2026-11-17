import { useEffect } from "react";

const TIPOS_AVISO = {
  error: { titulo: "Atención", icono: "!" },
  exito: { titulo: "¡Listo!", icono: "✓" },
  confirmar: { titulo: "¿Estás seguro?", icono: "?" },
};

/**
 * Ventana (dialog) con la que el sitio le avisa al usuario de un error, de una acción
 * realizada o le pide confirmar una acción. Se abre cada vez que recibe un aviso nuevo.
 * @method VentanaAviso
 * @param {object} props - Propiedades del componente.
 * @param {{texto: string, tipo: string, textoBoton: string}|null} props.aviso - Mensaje a mostrar, su tipo ("error", "exito" o "confirmar") y el texto del botón principal; null si no hay aviso.
 * @param {Function} props.alResponder - Recibe true si el usuario eligió el botón principal o false si eligió Cancelar.
 * @param {Function} props.alCerrar - Se ejecuta cuando la ventana se cierra (también con la tecla Escape).
 * @return {JSX.Element} Ventana de aviso.
 */
const VentanaAviso = ({ aviso, alResponder, alCerrar }) => {
  const tipo = aviso === null ? "error" : aviso.tipo;

  useEffect(() => {
    const ventana = document.getElementById("aviso");
    if (aviso !== null && !ventana.open) {
      ventana.showModal();
    }
  }, [aviso]);

  return (
    <dialog
      id="aviso"
      className={tipo === "exito" ? "ventana-aviso ventana-aviso-exito" : "ventana-aviso"}
      aria-labelledby="aviso-titulo"
      aria-describedby="aviso-texto"
      onClose={alCerrar}
    >
      <div className="ventana-aviso-contenido">
        <span className="ventana-aviso-icono" aria-hidden="true">
          {TIPOS_AVISO[tipo].icono}
        </span>
        <h2 id="aviso-titulo">{TIPOS_AVISO[tipo].titulo}</h2>
        <p id="aviso-texto">{aviso === null ? "" : aviso.texto}</p>
        <div className="ventana-aviso-botones">
          {tipo === "confirmar" && (
            <button
              type="button"
              className="ventana-aviso-boton boton-secundario"
              onClick={() => alResponder(false)}
            >
              Cancelar
            </button>
          )}
          <button type="button" className="ventana-aviso-boton" onClick={() => alResponder(true)}>
            {aviso === null ? "Aceptar" : aviso.textoBoton}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default VentanaAviso;
