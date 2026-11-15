import { CANTIDAD_MAXIMA, PROVINCIA_EXPRESS } from "@data/tienda";

const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

const REGLAS = [
  {
    campo: "nombre",
    obligatorio: "El nombre es obligatorio.",
    formato: SOLO_LETRAS,
    mensaje: "El nombre solo puede contener letras.",
  },
  {
    campo: "apellido",
    obligatorio: "El apellido es obligatorio.",
    formato: SOLO_LETRAS,
    mensaje: "El apellido solo puede contener letras.",
  },
  {
    campo: "dni",
    obligatorio: "El DNI es obligatorio.",
    formato: /^[1-9]\d{6,7}$/,
    mensaje: "Ingresá un DNI válido: solo números, 7 u 8 dígitos.",
  },
  { campo: "genero", obligatorio: "Seleccioná tu género." },
  { campo: "calle", obligatorio: "La calle es obligatoria." },
  {
    campo: "numero",
    obligatorio: "El número de la dirección es obligatorio.",
    formato: /^[1-9]\d{0,4}$/,
    mensaje: "Ingresá un número de calle válido: entero mayor a cero.",
  },
  {
    campo: "piso",
    formato: /^\d{1,2}$/,
    mensaje: "El piso debe ser un número de hasta 2 dígitos.",
  },
  {
    campo: "codigoPostal",
    obligatorio: "El código postal es obligatorio.",
    formato: /^[1-9]\d{3}$/,
    mensaje: "Ingresá un código postal válido de 4 dígitos.",
  },
  {
    campo: "ciudad",
    obligatorio: "La ciudad es obligatoria.",
    formato: SOLO_LETRAS,
    mensaje: "La ciudad solo puede contener letras.",
  },
  { campo: "provincia", obligatorio: "Seleccioná una provincia." },
];

/**
 * Convierte el texto ingresado como cantidad en un número válido.
 * @method leerCantidad
 * @param {string} texto - Valor escrito por el usuario.
 * @return {number|null} Entero entre 1 y el máximo, o null si el valor no es válido.
 */
export const leerCantidad = (texto) => {
  if (!/^\d+$/.test(texto.trim())) {
    return null;
  }
  const cantidad = Number(texto);
  return cantidad >= 1 && cantidad <= CANTIDAD_MAXIMA ? cantidad : null;
};

/**
 * Comprueba un único campo del formulario de compra.
 * @method validarCampo
 * @param {string} campo - Nombre del campo a comprobar.
 * @param {string} valor - Valor ingresado por el usuario.
 * @param {boolean} exigirObligatorio - Indica si un campo vacío debe informarse como error.
 * @return {string|null} Mensaje de error, o null si el valor es correcto.
 */
export const validarCampo = (campo, valor, exigirObligatorio) => {
  const regla = REGLAS.find((item) => item.campo === campo);
  const texto = valor.trim();

  if (!regla) {
    return null;
  }
  if (texto === "") {
    return exigirObligatorio && regla.obligatorio ? regla.obligatorio : null;
  }
  return regla.formato && !regla.formato.test(texto) ? regla.mensaje : null;
};

/**
 * Valida todos los datos del formulario de compra, en orden.
 * @method validarCompra
 * @param {object} datos - Valores del formulario, indexados por nombre de campo.
 * @param {string} metodoEnvio - Identificador del método de envío elegido.
 * @return {{campo: string, mensaje: string}|null} Primer error encontrado, o null si todo es correcto.
 */
export const validarCompra = (datos, metodoEnvio) => {
  for (const regla of REGLAS) {
    const mensaje = validarCampo(regla.campo, datos[regla.campo], true);
    if (mensaje) {
      return { campo: regla.campo, mensaje };
    }
  }

  if (metodoEnvio === "express" && datos.provincia !== PROVINCIA_EXPRESS) {
    return {
      campo: "envio",
      mensaje: `El envío express está disponible solo para la provincia de ${PROVINCIA_EXPRESS}.`,
    };
  }

  return null;
};
