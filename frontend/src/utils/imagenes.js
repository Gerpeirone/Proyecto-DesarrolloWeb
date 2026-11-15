const archivos = import.meta.glob("@imagenes/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const IMAGENES = Object.fromEntries(
  Object.entries(archivos).map(([ruta, url]) => [ruta.split("/imagenes/")[1], url])
);

/**
 * Devuelve la dirección de una imagen de la carpeta "imagenes" del proyecto.
 * @method obtenerImagen
 * @param {string} ruta - Ruta dentro de la carpeta, por ejemplo "remeras/remera-negra-basic.jpg".
 * @return {string} Dirección lista para usar en el atributo src.
 */
export const obtenerImagen = (ruta) => {
  return IMAGENES[ruta] || "";
};
