import { useState } from "react";
import { CANTIDAD_MAXIMA } from "@data/tienda";
import { formatearPrecio } from "@utils/formato";
import { obtenerImagen } from "@utils/imagenes";
import { leerCantidad } from "@utils/validaciones";

/**
 * Ficha de un producto: galería, datos, elección de talle y cantidad,
 * cálculo del subtotal y botón para agregarlo al carrito.
 * @method FichaProducto
 * @param {object} props - Propiedades del componente.
 * @param {object} props.producto - Producto a mostrar.
 * @param {Function} props.alAgregar - Función que recibe el producto elegido para el carrito.
 * @return {JSX.Element} Detalle completo del producto.
 */
const FichaProducto = ({ producto, alAgregar }) => {
  const galeria = [producto.imagen, producto.imagenSecundaria];
  const [imagenActiva, setImagenActiva] = useState(0);
  const [talle, setTalle] = useState(producto.talles[0]);
  const [cantidad, setCantidad] = useState("1");

  const cantidadValida = leerCantidad(cantidad);

  /**
   * Muestra en grande la miniatura elegida.
   * @method elegirImagen
   * @param {React.MouseEvent<HTMLButtonElement>} evento - Clic sobre una miniatura.
   * @return {void}
   */
  const elegirImagen = (evento) => {
    setImagenActiva(Number(evento.currentTarget.dataset.indice));
  };

  /**
   * Guarda el talle elegido.
   * @method cambiarTalle
   * @param {React.ChangeEvent<HTMLSelectElement>} evento - Cambio en la lista de talles.
   * @return {void}
   */
  const cambiarTalle = (evento) => {
    setTalle(evento.target.value);
  };

  /**
   * Guarda la cantidad escrita para recalcular el subtotal.
   * @method cambiarCantidad
   * @param {React.ChangeEvent<HTMLInputElement>} evento - Cambio en el campo de cantidad.
   * @return {void}
   */
  const cambiarCantidad = (evento) => {
    setCantidad(evento.target.value);
  };

  /**
   * Valida la cantidad y agrega el producto al carrito.
   * Si la cantidad es incorrecta avisa al usuario y blanquea el campo.
   * @method agregar
   * @return {void}
   */
  const agregar = () => {
    if (cantidadValida === null) {
      window.crewlabNotificar(`Ingresá una cantidad válida: un número entero entre 1 y ${CANTIDAD_MAXIMA}.`);
      setCantidad("");
      return;
    }

    alAgregar({
      id: `${producto.id}-${talle}`,
      nombre: `${producto.nombre} (talle ${talle})`,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidadValida,
    });
    window.crewlabNotificar("Producto agregado al carrito.", "exito");
  };

  return (
    <div className="producto-detalle">
      <div className="galeria">
        <div className="miniaturas">
          {galeria.map((ruta, indice) => (
            <button
              key={ruta}
              type="button"
              className={indice === imagenActiva ? "miniatura activa" : "miniatura"}
              aria-label={`Ver imagen ${indice + 1}`}
              data-indice={indice}
              onClick={elegirImagen}
            >
              <img src={obtenerImagen(ruta)} alt={`${producto.nombre}, vista ${indice + 1}`} />
            </button>
          ))}
        </div>
        <img
          className="imagen-principal"
          src={obtenerImagen(galeria[imagenActiva])}
          alt={producto.nombre}
        />
      </div>

      <div className="info-producto">
        <h2>{producto.nombre}</h2>
        <p className="precio">{formatearPrecio(producto.precio)}</p>
        <p className="descripcion">{producto.descripcion}</p>

        <div className="opciones">
          <div className="opcion">
            <label htmlFor="talle">Talle</label>
            <select id="talle" value={talle} onChange={cambiarTalle}>
              {producto.talles.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>
          <div className="opcion">
            <label htmlFor="cantidad">Cantidad (1 a {CANTIDAD_MAXIMA})</label>
            <input
              type="text"
              id="cantidad"
              inputMode="numeric"
              value={cantidad}
              onChange={cambiarCantidad}
            />
          </div>
        </div>

        <p className="subtotal">
          Subtotal: {cantidadValida === null ? "-" : formatearPrecio(producto.precio * cantidadValida)}
        </p>
        <button type="button" className="boton-agregar" onClick={agregar}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default FichaProducto;
