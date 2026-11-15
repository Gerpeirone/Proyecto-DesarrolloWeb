import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const PUERTO = 3001;
const ARCHIVO_DATOS = new URL("../src/data/productos.json", import.meta.url);

/**
 * Lee el catálogo de productos desde el archivo de datos.
 * @method leerProductos
 * @return {Promise<Array<object>>} Lista completa de productos.
 */
const leerProductos = async () => {
  return JSON.parse(await readFile(ARCHIVO_DATOS, "utf-8"));
};

/**
 * Envía una respuesta en formato JSON permitiendo el acceso desde el navegador.
 * @method responder
 * @param {import("node:http").ServerResponse} respuesta - Respuesta HTTP a completar.
 * @param {number} estado - Código de estado HTTP.
 * @param {object} cuerpo - Datos a enviar.
 * @return {void}
 */
const responder = (respuesta, estado, cuerpo) => {
  respuesta.writeHead(estado, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  respuesta.end(JSON.stringify(cuerpo));
};

/**
 * Atiende los pedidos al servicio simulado de productos.
 * Rutas: GET /productos, GET /productos?categoria=remeras y GET /productos?id=1.
 * @method atender
 * @param {import("node:http").IncomingMessage} pedido - Pedido HTTP recibido.
 * @param {import("node:http").ServerResponse} respuesta - Respuesta HTTP a completar.
 * @return {Promise<void>}
 */
const atender = async (pedido, respuesta) => {
  const url = new URL(pedido.url, `http://localhost:${PUERTO}`);

  if (pedido.method !== "GET" || url.pathname !== "/productos") {
    responder(respuesta, 404, { mensaje: "Ruta no encontrada" });
    return;
  }

  const categoria = url.searchParams.get("categoria");
  const id = url.searchParams.get("id");
  let productos = await leerProductos();

  if (categoria) {
    productos = productos.filter((producto) => producto.categoria === categoria);
  }
  if (id) {
    productos = productos.filter((producto) => producto.id === Number(id));
  }

  responder(respuesta, 200, productos);
};

createServer(atender).listen(PUERTO, () => {
  console.log(`Servicio simulado disponible en http://localhost:${PUERTO}/productos`);
});
