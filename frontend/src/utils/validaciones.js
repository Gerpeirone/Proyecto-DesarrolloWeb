import { CANTIDAD_MAXIMA, PROVINCIA_EXPRESS } from "@data/tienda";

const NUMEROS = "0123456789";
const LETRAS = "abcdefghijklmnñopqrstuvwxyzáéíóúü ";

const REGLAS = [
  {
    campo: "nombre",
    obligatorio: "El nombre es obligatorio.",
    permitidos: LETRAS,
    mensaje: "El nombre solo puede contener letras.",
  },
  {
    campo: "apellido",
    obligatorio: "El apellido es obligatorio.",
    permitidos: LETRAS,
    mensaje: "El apellido solo puede contener letras.",
  },
  {
    campo: "dni",
    obligatorio: "El DNI es obligatorio.",
    permitidos: NUMEROS,
    minimo: 7,
    maximo: 8,
    sinCeroInicial: true,
    mensaje: "Ingresá un DNI válido: solo números, 7 u 8 dígitos.",
  },
  { campo: "genero", obligatorio: "Seleccioná tu género." },
  { campo: "calle", obligatorio: "La calle es obligatoria." },
  {
    campo: "numero",
    obligatorio: "El número de la dirección es obligatorio.",
    permitidos: NUMEROS,
    minimo: 1,
    maximo: 5,
    sinCeroInicial: true,
    mensaje: "Ingresá un número de calle válido: entero mayor a cero.",
  },
  {
    campo: "piso",
    permitidos: NUMEROS,
    minimo: 1,
    maximo: 2,
    sinCeroInicial: false,
    mensaje: "El piso debe ser un número de hasta 2 dígitos.",
  },
  {
    campo: "codigoPostal",
    obligatorio: "El código postal es obligatorio.",
    permitidos: NUMEROS,
    minimo: 4,
    maximo: 4,
    sinCeroInicial: true,
    mensaje: "Ingresá un código postal válido de 4 dígitos.",
  },
  {
    campo: "ciudad",
    obligatorio: "La ciudad es obligatoria.",
    permitidos: LETRAS,
    mensaje: "La ciudad solo puede contener letras.",
  },
  { campo: "provincia", obligatorio: "Seleccioná una provincia." },
];

/**
 * Indica si todos los caracteres de un texto están dentro de los permitidos.
 * @method soloContiene
 * @param {string} texto - Texto a revisar.
 * @param {string} permitidos - Caracteres aceptados.
 * @return {boolean} true si el texto no tiene ningún carácter fuera de los permitidos.
 */
const soloContiene = (texto, permitidos) => {
  for (let i = 0; i < texto.length; i++) {
    if (!permitidos.includes(texto[i].toLowerCase())) {
      return false;
    }
  }
  return true;
};

/**
 * Quita del texto los caracteres que no están permitidos.
 * @method filtrarTexto
 * @param {string} texto - Valor escrito por el usuario.
 * @param {string} permitidos - Caracteres aceptados.
 * @return {string} El mismo texto, solo con los caracteres permitidos.
 */
const filtrarTexto = (texto, permitidos) => {
  let limpio = "";
  for (let i = 0; i < texto.length; i++) {
    if (permitidos.includes(texto[i].toLowerCase())) {
      limpio += texto[i];
    }
  }
  return limpio;
};

/**
 * Deja en el texto solo los números, para los campos numéricos.
 * @method dejarSoloNumeros
 * @param {string} texto - Valor escrito por el usuario.
 * @return {string} El mismo texto, solo con sus dígitos.
 */
export const dejarSoloNumeros = (texto) => {
  return filtrarTexto(texto, NUMEROS);
};

/**
 * Deja en el texto solo las letras y espacios, para los campos de nombre, apellido y ciudad.
 * @method dejarSoloLetras
 * @param {string} texto - Valor escrito por el usuario.
 * @return {string} El mismo texto, solo con sus letras y espacios.
 */
export const dejarSoloLetras = (texto) => {
  return filtrarTexto(texto, LETRAS);
};

/**
 * Prepara la cantidad que escribe el usuario: deja solo números y no permite superar el máximo.
 * @method limitarCantidad
 * @param {string} texto - Valor escrito por el usuario.
 * @return {string} Cantidad lista para mostrar en el campo.
 */
export const limitarCantidad = (texto) => {
  const digitos = dejarSoloNumeros(texto);
  return Number(digitos) > CANTIDAD_MAXIMA ? String(CANTIDAD_MAXIMA) : digitos;
};

/**
 * Convierte el texto ingresado como cantidad en un número válido.
 * @method leerCantidad
 * @param {string} texto - Valor escrito por el usuario.
 * @return {number|null} Número entre 1 y el máximo, o null si el valor no es válido.
 */
export const leerCantidad = (texto) => {
  const cantidad = Number(texto);
  if (texto.trim() === "" || isNaN(cantidad) || cantidad < 1 || cantidad > CANTIDAD_MAXIMA) {
    return null;
  }
  return cantidad;
};

/**
 * Indica si un valor con contenido cumple el formato de su regla.
 * @method cumpleFormato
 * @param {object} regla - Regla del campo, con los caracteres permitidos y, si es numérico, su largo.
 * @param {string} texto - Valor ingresado, sin espacios al principio ni al final.
 * @return {boolean} true si el valor es correcto.
 */
const cumpleFormato = (regla, texto) => {
  if (regla.permitidos === undefined) {
    return true;
  }
  if (!soloContiene(texto, regla.permitidos)) {
    return false;
  }
  if (regla.minimo === undefined) {
    return true;
  }
  const largoCorrecto = texto.length >= regla.minimo && texto.length <= regla.maximo;
  const empiezaConCero = regla.sinCeroInicial && texto[0] === "0";
  return largoCorrecto && !empiezaConCero;
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
  const encontradas = REGLAS.filter((item) => item.campo === campo);
  const texto = valor.trim();

  if (encontradas.length === 0) {
    return null;
  }
  const regla = encontradas[0];
  if (texto === "") {
    return exigirObligatorio && regla.obligatorio ? regla.obligatorio : null;
  }
  return cumpleFormato(regla, texto) ? null : regla.mensaje;
};

/**
 * Valida todos los datos del formulario de compra, en orden.
 * @method validarCompra
 * @param {object} datos - Valores del formulario, indexados por nombre de campo.
 * @param {string} metodoEnvio - Identificador del método de envío elegido.
 * @return {{campo: string, mensaje: string}|null} Primer error encontrado, o null si todo es correcto.
 */
export const validarCompra = (datos, metodoEnvio) => {
  for (let i = 0; i < REGLAS.length; i++) {
    const campo = REGLAS[i].campo;
    const mensaje = validarCampo(campo, datos[campo], true);
    if (mensaje) {
      return { campo: campo, mensaje: mensaje };
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
