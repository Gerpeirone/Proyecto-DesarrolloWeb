import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Aviso from "@components/Aviso";
import { GENEROS, METODOS_ENVIO, PROVINCIAS } from "@data/tienda";
import { calcularEnvio, calcularSubtotal } from "@utils/carrito";
import { formatearPrecio } from "@utils/formato";
import {
  dejarSoloLetras,
  dejarSoloNumeros,
  validarCampo,
  validarCompra,
} from "@utils/validaciones";

const DATOS_INICIALES = {
  nombre: "",
  apellido: "",
  dni: "",
  genero: "",
  calle: "",
  numero: "",
  piso: "",
  departamento: "",
  codigoPostal: "",
  ciudad: "",
  provincia: "",
  observaciones: "",
};

const CAMPOS_COMPRADOR = [
  { id: "nombre", etiqueta: "Nombre", ejemplo: "Ej.: Juan" },
  { id: "apellido", etiqueta: "Apellido", ejemplo: "Ej.: Pérez" },
  { id: "dni", etiqueta: "DNI", ejemplo: "Solo números, 7 u 8 dígitos", largo: 8 },
];

const CAMPOS_DIRECCION = [
  { id: "calle", etiqueta: "Calle", ejemplo: "Ej.: San Martín" },
  { id: "numero", etiqueta: "Número", ejemplo: "Ej.: 1234", largo: 5 },
  { id: "piso", etiqueta: "Piso (opcional)", ejemplo: "Ej.: 3", largo: 2 },
  { id: "departamento", etiqueta: "Departamento (opcional)", ejemplo: "Ej.: B" },
  { id: "codigoPostal", etiqueta: "Código postal", ejemplo: "Ej.: 5000", largo: 4 },
  { id: "ciudad", etiqueta: "Ciudad", ejemplo: "Ej.: Córdoba" },
];

const CAMPOS_NUMERICOS = [...CAMPOS_COMPRADOR, ...CAMPOS_DIRECCION]
  .filter((campo) => campo.largo)
  .map((campo) => campo.id);

const CAMPOS_LETRAS = ["nombre", "apellido", "ciudad"];

/**
 * Página para finalizar la compra: resumen, cálculo de envío y total,
 * y formulario con validación de los datos del comprador.
 * @method Checkout
 * @return {JSX.Element} Formulario de compra o aviso si el carrito está vacío.
 */
const Checkout = () => {
  const { carrito, vaciarCarrito, mostrarAviso } = useOutletContext();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [metodoEnvio, setMetodoEnvio] = useState(METODOS_ENVIO[0].id);

  const subtotal = calcularSubtotal(carrito);
  const envio = calcularEnvio(metodoEnvio, subtotal);
  const total = subtotal + envio;

  /**
   * Guarda en el estado el valor escrito o elegido en un campo.
   * @method cambiarDato
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>} evento - Cambio en un campo.
   * @return {void}
   */
  const cambiarDato = (evento) => {
    const { name, value } = evento.target;
    let valor = value;
    if (CAMPOS_NUMERICOS.includes(name)) {
      valor = dejarSoloNumeros(value);
    } else if (CAMPOS_LETRAS.includes(name)) {
      valor = dejarSoloLetras(value);
    }
    setDatos((actuales) => ({ ...actuales, [name]: valor }));
  };

  /**
   * Avisa al usuario de un valor incorrecto y blanquea el campo.
   * @method informarError
   * @param {string} campo - Nombre del campo con el valor incorrecto.
   * @param {string} mensaje - Texto que se muestra al usuario.
   * @return {void}
   */
  const informarError = (campo, mensaje) => {
    mostrarAviso(mensaje);
    setDatos((actuales) => ({ ...actuales, [campo]: "" }));
  };

  /**
   * Valida un campo cuando el usuario sale de él, si escribió algo.
   * @method validarAlSalir
   * @param {React.FocusEvent<HTMLInputElement>} evento - Pérdida de foco de un campo.
   * @return {void}
   */
  const validarAlSalir = (evento) => {
    const { name, value } = evento.target;
    const mensaje = validarCampo(name, value, false);
    if (mensaje) {
      informarError(name, mensaje);
    }
  };

  /**
   * Guarda el método de envío elegido para recalcular el total.
   * @method cambiarEnvio
   * @param {React.ChangeEvent<HTMLInputElement>} evento - Cambio en las opciones de envío.
   * @return {void}
   */
  const cambiarEnvio = (evento) => {
    setMetodoEnvio(evento.target.value);
  };

  /**
   * Procesa el envío del formulario: valida, informa el total y vacía el carrito.
   * @method confirmarCompra
   * @param {React.FormEvent<HTMLFormElement>} evento - Envío del formulario.
   * @return {void}
   */
  const confirmarCompra = (evento) => {
    evento.preventDefault();
    const error = validarCompra(datos, metodoEnvio);

    if (error && error.campo === "envio") {
      mostrarAviso(error.mensaje);
      setMetodoEnvio(METODOS_ENVIO[0].id);
      return;
    }

    if (error) {
      informarError(error.campo, error.mensaje);
      return;
    }

    vaciarCarrito();
    navigate("/");
    mostrarAviso(`¡Gracias por tu compra! El total a pagar es ${formatearPrecio(total)}.`, "exito");
  };

  /**
   * Arma la etiqueta y el campo de texto de un dato del formulario.
   * @method dibujarCampo
   * @param {{id: string, etiqueta: string, ejemplo: string, largo: (number|undefined)}} campo - Configuración del campo; largo indica que es numérico y su máximo de dígitos.
   * @return {JSX.Element} Etiqueta y campo de texto asociados.
   */
  const dibujarCampo = (campo) => {
    return (
      <div className="campo" key={campo.id}>
        <label htmlFor={campo.id}>{campo.etiqueta}</label>
        <input
          type="text"
          id={campo.id}
          name={campo.id}
          inputMode={campo.largo ? "numeric" : "text"}
          maxLength={campo.largo}
          placeholder={campo.ejemplo}
          value={datos[campo.id]}
          onChange={cambiarDato}
          onBlur={validarAlSalir}
        />
      </div>
    );
  };

  if (carrito.length === 0) {
    return (
      <Aviso
        titulo="Tu carrito está vacío"
        texto="Agregá productos antes de finalizar la compra."
        destino="/"
        etiqueta="Ver productos"
      />
    );
  }

  return (
    <div className="checkout-contenedor">
      <h2>Finalizar compra</h2>

      <section className="resumen-carrito">
        <h3>Resumen de tu compra</h3>
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              <span>
                {item.nombre} x {item.cantidad}
              </span>
              <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
            </li>
          ))}
        </ul>
        <p>Subtotal: {formatearPrecio(subtotal)}</p>
        <p>Envío: {formatearPrecio(envio)}</p>
        <p className="checkout-total">Total: {formatearPrecio(total)}</p>
      </section>

      <form onSubmit={confirmarCompra} noValidate>
        <h3>Método de envío</h3>
        <div className="metodo-envio">
          {METODOS_ENVIO.map((metodo) => (
            <div className="opcion-envio" key={metodo.id}>
              <input
                type="radio"
                id={`envio-${metodo.id}`}
                name="envio"
                value={metodo.id}
                checked={metodoEnvio === metodo.id}
                onChange={cambiarEnvio}
              />
              <label htmlFor={`envio-${metodo.id}`}>
                {metodo.nombre} ({metodo.costo > 0 ? formatearPrecio(metodo.costo) : "sin costo"})
              </label>
            </div>
          ))}
        </div>

        <h3>Datos del comprador</h3>
        {CAMPOS_COMPRADOR.map(dibujarCampo)}
        <div className="campo">
          <label htmlFor="genero">Género</label>
          <select id="genero" name="genero" value={datos.genero} onChange={cambiarDato}>
            <option value="">Seleccioná una opción</option>
            {GENEROS.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>

        <h3>Dirección de entrega</h3>
        {CAMPOS_DIRECCION.map(dibujarCampo)}
        <div className="campo">
          <label htmlFor="provincia">Provincia</label>
          <select id="provincia" name="provincia" value={datos.provincia} onChange={cambiarDato}>
            <option value="">Seleccioná una opción</option>
            {PROVINCIAS.map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="observaciones">Observaciones (opcional)</label>
          <textarea
            id="observaciones"
            name="observaciones"
            placeholder="Indicaciones para el envío, horarios, referencias."
            value={datos.observaciones}
            onChange={cambiarDato}
          />
        </div>

        <button type="submit" className="boton-confirmar">
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;
