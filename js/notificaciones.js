/* Avisos compartidos por las versiones HTML y React. */
(() => {
  let contenedor;
  let temporizador;

  window.crewlabNotificar = (mensaje, tipo = "error") => {
    if (!contenedor) {
      contenedor = document.createElement("div");
      contenedor.className = "crewlab-notificaciones";
      contenedor.setAttribute("aria-label", "Notificaciones de CrewLab");
      document.body.append(contenedor);
    }
    clearTimeout(temporizador);
    contenedor.replaceChildren();
    const aviso = document.createElement("div");
    aviso.className = `crewlab-notificacion crewlab-notificacion--${tipo}`;
    aviso.setAttribute("role", tipo === "exito" ? "status" : "alert");
    aviso.setAttribute("aria-atomic", "true");
    const contenido = document.createElement("div");
    const titulo = document.createElement("strong");
    titulo.textContent = "CrewLab";
    const texto = document.createElement("p");
    texto.textContent = mensaje;
    contenido.append(titulo, texto);
    const cerrar = document.createElement("button");
    cerrar.type = "button";
    cerrar.className = "crewlab-notificacion-cerrar";
    cerrar.setAttribute("aria-label", "Cerrar notificación");
    cerrar.textContent = "×";
    cerrar.addEventListener("click", () => {
      clearTimeout(temporizador);
      aviso.remove();
    });
    aviso.append(contenido, cerrar);
    // Insertar el contenido después de crear la región permite anunciarlo.
    contenedor.append(aviso);
    if (tipo === "exito") {
      const programarCierre = () => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => aviso.remove(), 7000);
      };
      aviso.addEventListener("mouseenter", () => clearTimeout(temporizador));
      aviso.addEventListener("mouseleave", programarCierre);
      aviso.addEventListener("focusin", () => clearTimeout(temporizador));
      aviso.addEventListener("focusout", programarCierre);
      programarCierre();
    }
  };

  // La compra HTML navega al inicio: conservar su confirmación entre páginas.
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const mensaje = sessionStorage.getItem("crewlab_confirmacion");
      if (mensaje) {
        sessionStorage.removeItem("crewlab_confirmacion");
        window.crewlabNotificar(mensaje, "exito");
      }
    } catch { /* El navegador puede bloquear el almacenamiento. */ }
  });
})();
