const COSTOS_ENVIO = { domicilio: 2500, express: 6000, local: 0 };
const PROVINCIA_EXPRESS = "Córdoba";

/**
 * Devuelve el método de envío elegido en el formulario.
 * @method obtenerMetodoEnvio
 * @return {string} Valor del método seleccionado: domicilio, express o local.
 */
const obtenerMetodoEnvio = () => {
  let elegido = "domicilio";
  document.getElementsByName("envio").forEach((opcion) => {
    if (opcion.checked) {
      elegido = opcion.value;
    }
  });
  return elegido;
};

/**
 * Calcula el costo de envío; si no hay productos el envío no tiene costo.
 * @method calcularEnvio
 * @param {string} metodo - Método de envío: domicilio, express o local.
 * @param {number} subtotal - Importe de los productos del carrito.
 * @return {number} Costo del envío.
 */
const calcularEnvio = (metodo, subtotal) => {
  return subtotal > 0 ? COSTOS_ENVIO[metodo] : 0;
};

/**
 * Dibuja el resumen de la compra y calcula subtotal, envío y total a pagar.
 * @method actualizarTotales
 * @return {number} Total a pagar (productos más envío).
 */
const actualizarTotales = () => {
  const carrito = leerCarrito();
  let contenido = "";

  if (carrito.length === 0) {
    contenido = '<li class="carrito-vacio">Tu carrito está vacío.</li>';
  }

  carrito.forEach((item) => {
    contenido += `<li>
        <span>${item.nombre} x ${item.cantidad}</span>
        <strong>${formatearPrecio(item.precio * item.cantidad)}</strong>
      </li>`;
  });
  document.getElementById("checkout-lista").innerHTML = contenido;

  const subtotal = calcularSubtotal(carrito);
  const envio = calcularEnvio(obtenerMetodoEnvio(), subtotal);
  const total = subtotal + envio;

  document.getElementById("checkout-subtotal").innerText = "Subtotal: " + formatearPrecio(subtotal);
  document.getElementById("checkout-envio").innerText = "Envío: " + formatearPrecio(envio);
  document.getElementById("checkout-total").innerText = "Total: " + formatearPrecio(total);
  return total;
};

/**
 * Pregunta si se quiere vaciar el carrito desde la página de compra y,
 * si el usuario confirma, lo vacía y actualiza el resumen.
 * @method vaciarCompra
 * @return {void}
 */
const vaciarCompra = () => {
  confirmarVaciarCarrito(() => {
    vaciarCarrito();
    actualizarTotales();
  });
};

/**
 * Avisa al usuario de un valor incorrecto y blanquea el campo.
 * @method informarError
 * @param {HTMLInputElement|HTMLSelectElement} campo - Campo con el valor incorrecto.
 * @param {string} mensaje - Texto que se muestra al usuario.
 * @return {boolean} Siempre false, para indicar que la validación falló.
 */
const informarError = (campo, mensaje) => {
  mostrarAviso(mensaje);
  campo.value = "";
  return false;
};

/**
 * Comprueba que un campo obligatorio no esté vacío.
 * @method validarObligatorio
 * @param {string} id - Identificador del campo.
 * @param {string} mensaje - Texto a mostrar si el campo está vacío.
 * @return {boolean} true si el campo tiene contenido.
 */
const validarObligatorio = (id, mensaje) => {
  const campo = document.getElementById(id);
  return campo.value.trim() === "" ? informarError(campo, mensaje) : true;
};

/**
 * Comprueba que un campo, si tiene contenido, solo tenga letras y espacios.
 * @method validarSoloLetras
 * @param {string} id - Identificador del campo.
 * @param {string} etiqueta - Nombre del campo para armar el mensaje, por ejemplo "El nombre".
 * @return {boolean} true si el campo está vacío o es válido.
 */
const validarSoloLetras = (id, etiqueta) => {
  const campo = document.getElementById(id);
  if (soloContiene(campo.value.trim(), LETRAS)) {
    return true;
  }
  return informarError(campo, `${etiqueta} solo puede contener letras.`);
};

/**
 * Comprueba que un campo, si tiene contenido, sea un número con una cantidad de dígitos permitida.
 * @method validarNumero
 * @param {string} id - Identificador del campo.
 * @param {number} minimo - Cantidad mínima de dígitos.
 * @param {number} maximo - Cantidad máxima de dígitos.
 * @param {boolean} sinCeroInicial - true si el número no puede empezar con 0.
 * @param {string} mensaje - Texto a mostrar si el valor no es válido.
 * @return {boolean} true si el campo está vacío o es válido.
 */
const validarNumero = (id, minimo, maximo, sinCeroInicial, mensaje) => {
  const campo = document.getElementById(id);
  const valor = campo.value.trim();
  if (valor === "") {
    return true;
  }
  const largoCorrecto = valor.length >= minimo && valor.length <= maximo;
  const empiezaConCero = sinCeroInicial && valor[0] === "0";
  if (soloContiene(valor, NUMEROS) && largoCorrecto && !empiezaConCero) {
    return true;
  }
  return informarError(campo, mensaje);
};

/**
 * Comprueba que el DNI tenga solo números, de 7 u 8 dígitos y sin ceros a la izquierda.
 * @method validarDni
 * @return {boolean} true si el campo está vacío o es válido.
 */
const validarDni = () => {
  return validarNumero("dni", 7, 8, true, "Ingresá un DNI válido: solo números, 7 u 8 dígitos.");
};

/**
 * Comprueba que el número de la dirección sea un entero mayor a cero, de hasta 5 dígitos.
 * @method validarNumeroCalle
 * @return {boolean} true si el campo está vacío o es válido.
 */
const validarNumeroCalle = () => {
  return validarNumero("numero", 1, 5, true, "Ingresá un número de calle válido: entero mayor a cero.");
};

/**
 * Comprueba que el código postal tenga exactamente 4 dígitos.
 * @method validarCodigoPostal
 * @return {boolean} true si el campo está vacío o es válido.
 */
const validarCodigoPostal = () => {
  return validarNumero("codigo-postal", 4, 4, true, "Ingresá un código postal válido de 4 dígitos.");
};

/**
 * Comprueba que el envío express solo se use para la provincia habilitada.
 * @method validarEnvioExpress
 * @return {boolean} true si el método de envío es compatible con la provincia.
 */
const validarEnvioExpress = () => {
  const provincia = document.getElementById("provincia").value;
  if (obtenerMetodoEnvio() !== "express" || provincia === PROVINCIA_EXPRESS) {
    return true;
  }
  mostrarAviso(`El envío express está disponible solo para la provincia de ${PROVINCIA_EXPRESS}.`);
  document.getElementById("envio-domicilio").checked = true;
  actualizarTotales();
  return false;
};

/**
 * Valida todos los datos del formulario de compra, en orden.
 * @method validarFormulario
 * @return {boolean} true si todos los valores ingresados son correctos.
 */
const validarFormulario = () => {
  return (
    validarObligatorio("nombre", "El nombre es obligatorio.") &&
    validarSoloLetras("nombre", "El nombre") &&
    validarObligatorio("apellido", "El apellido es obligatorio.") &&
    validarSoloLetras("apellido", "El apellido") &&
    validarObligatorio("dni", "El DNI es obligatorio.") &&
    validarDni() &&
    validarObligatorio("genero", "Seleccioná tu género.") &&
    validarObligatorio("calle", "La calle es obligatoria.") &&
    validarObligatorio("numero", "El número de la dirección es obligatorio.") &&
    validarNumeroCalle() &&
    validarNumero("piso", 1, 2, false, "El piso debe ser un número de hasta 2 dígitos.") &&
    validarObligatorio("codigo-postal", "El código postal es obligatorio.") &&
    validarCodigoPostal() &&
    validarObligatorio("ciudad", "La ciudad es obligatoria.") &&
    validarSoloLetras("ciudad", "La ciudad") &&
    validarObligatorio("provincia", "Seleccioná una provincia.") &&
    validarEnvioExpress()
  );
};

/**
 * Procesa el envío del formulario: valida, informa el total y vacía el carrito.
 * Al aceptar el aviso de compra realizada, vuelve a la página de inicio.
 * @method confirmarCompra
 * @return {boolean} Siempre false, para que la página no se recargue.
 */
const confirmarCompra = () => {
  if (leerCarrito().length === 0) {
    mostrarAviso("Tu carrito está vacío. Agregá productos antes de confirmar la compra.");
    return false;
  }

  if (!validarFormulario()) {
    return false;
  }

  const total = actualizarTotales();
  vaciarCarrito();
  actualizarTotales();
  mostrarAviso(`¡Gracias por tu compra! El total a pagar es ${formatearPrecio(total)}.`, "exito", "index.html");
  return false;
};

actualizarTotales();
