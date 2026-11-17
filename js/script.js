const CLAVE_CARRITO = "crewlab_carrito";
const CANTIDAD_MAXIMA = 10;
const NUMEROS = "0123456789";
const LETRAS = "abcdefghijklmnñopqrstuvwxyzáéíóúü ";

const TIPOS_AVISO = {
  error: { titulo: "Atención", icono: "!" },
  exito: { titulo: "¡Listo!", icono: "✓" },
  confirmar: { titulo: "¿Estás seguro?", icono: "?" },
};

let accionConfirmada = null;
let destinoAviso = "";

/**
 * Da formato de moneda argentina a un número, sin decimales.
 * @method formatearPrecio
 * @param {number} valor - Importe a mostrar.
 * @return {string} Importe con el signo $ y separador de miles.
 */
const formatearPrecio = (valor) => {
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
  return formato.format(valor);
};

/**
 * Indica si todos los caracteres de un texto están dentro de los permitidos.
 * @method soloContiene
 * @param {string} texto - Texto a revisar.
 * @param {string} permitidos - Caracteres aceptados, por ejemplo NUMEROS o LETRAS.
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
 * Borra de un campo los caracteres que no están permitidos.
 * @method filtrarCampo
 * @param {HTMLInputElement} campo - Campo en el que escribe el usuario.
 * @param {string} permitidos - Caracteres aceptados, por ejemplo NUMEROS o LETRAS.
 * @return {void}
 */
const filtrarCampo = (campo, permitidos) => {
  let limpio = "";
  for (let i = 0; i < campo.value.length; i++) {
    if (permitidos.includes(campo.value[i].toLowerCase())) {
      limpio += campo.value[i];
    }
  }
  campo.value = limpio;
};

/**
 * Deja en un campo solo los números que escribió el usuario.
 * @method dejarSoloNumeros
 * @param {HTMLInputElement} campo - Campo en el que escribe el usuario.
 * @return {void}
 */
const dejarSoloNumeros = (campo) => {
  filtrarCampo(campo, NUMEROS);
};

/**
 * Deja en un campo solo las letras y espacios que escribió el usuario.
 * @method dejarSoloLetras
 * @param {HTMLInputElement} campo - Campo en el que escribe el usuario.
 * @return {void}
 */
const dejarSoloLetras = (campo) => {
  filtrarCampo(campo, LETRAS);
};

/**
 * Muestra un mensaje al usuario en la ventana de aviso (dialog) de CrewLab.
 * @method mostrarAviso
 * @param {string} mensaje - Texto que se le muestra al usuario.
 * @param {string} tipo - "error" para un problema, "exito" para una acción realizada o "confirmar" para una pregunta.
 * @param {string} destino - Página a la que se va al aceptar el aviso; vacío para quedarse en la misma.
 * @return {void}
 */
const mostrarAviso = (mensaje, tipo = "error", destino = "") => {
  const aviso = document.getElementById("aviso");
  if (tipo === "exito") {
    aviso.classList.add("ventana-aviso-exito");
  } else {
    aviso.classList.remove("ventana-aviso-exito");
  }
  document.getElementById("aviso-icono").innerText = TIPOS_AVISO[tipo].icono;
  document.getElementById("aviso-titulo").innerText = TIPOS_AVISO[tipo].titulo;
  document.getElementById("aviso-texto").innerText = mensaje;
  document.getElementById("aviso-aceptar").innerText = "Aceptar";
  document.getElementById("aviso-cancelar").classList.add("oculto");
  destinoAviso = destino;
  accionConfirmada = null;
  if (!aviso.open) {
    aviso.showModal();
  }
};

/**
 * Pregunta al usuario si quiere realizar una acción que no se puede deshacer.
 * La acción solo se ejecuta si elige el botón de confirmar.
 * @method pedirConfirmacion
 * @param {string} mensaje - Pregunta que se le muestra al usuario.
 * @param {string} textoBoton - Texto del botón que confirma la acción.
 * @param {Function} accion - Función que se ejecuta si el usuario confirma.
 * @return {void}
 */
const pedirConfirmacion = (mensaje, textoBoton, accion) => {
  mostrarAviso(mensaje, "confirmar");
  document.getElementById("aviso-aceptar").innerText = textoBoton;
  const cancelar = document.getElementById("aviso-cancelar");
  cancelar.classList.remove("oculto");
  cancelar.focus();
  accionConfirmada = accion;
};

/**
 * Cierra la ventana de aviso. Si el usuario confirmó, realiza la acción pendiente
 * y, si el aviso tenía una página de destino, la abre.
 * @method responderAviso
 * @param {boolean} confirmado - true si eligió Aceptar (o el botón de confirmar), false si eligió Cancelar.
 * @return {void}
 */
const responderAviso = (confirmado) => {
  document.getElementById("aviso").close();
  if (confirmado && accionConfirmada !== null) {
    accionConfirmada();
  }
  accionConfirmada = null;
  if (confirmado && destinoAviso !== "") {
    window.location.href = destinoAviso;
  }
};

/**
 * Indica si un elemento guardado en el carrito tiene datos correctos.
 * @method esItemValido
 * @param {object} item - Elemento leído desde el almacenamiento.
 * @return {boolean} true si tiene nombre, precio y cantidad válidos.
 */
const esItemValido = (item) => {
  return item !== null && item.nombre !== undefined && item.precio > 0 && item.cantidad > 0;
};

/**
 * Lee el carrito guardado en el navegador y descarta los datos inválidos.
 * @method leerCarrito
 * @return {Array<{nombre: string, precio: number, cantidad: number}>} Productos del carrito.
 */
const leerCarrito = () => {
  const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
  if (guardado === null) {
    return [];
  }
  return guardado.filter(esItemValido);
};

/**
 * Calcula la suma de precio por cantidad de todos los productos.
 * @method calcularSubtotal
 * @param {Array<{precio: number, cantidad: number}>} carrito - Productos del carrito.
 * @return {number} Importe total de los productos.
 */
const calcularSubtotal = (carrito) => {
  let suma = 0;
  carrito.forEach((item) => {
    suma += item.precio * item.cantidad;
  });
  return suma;
};

/**
 * Muestra en el encabezado la cantidad de artículos del carrito.
 * @method actualizarContador
 * @return {void}
 */
const actualizarContador = () => {
  const contador = document.getElementById("carrito-contador");
  if (contador === null) {
    return;
  }
  let cantidad = 0;
  leerCarrito().forEach((item) => {
    cantidad += item.cantidad;
  });
  contador.innerText = cantidad > 0 ? cantidad : "";
};

/**
 * Guarda el carrito en el navegador y actualiza el contador del encabezado.
 * @method guardarCarrito
 * @param {Array<{nombre: string, precio: number, cantidad: number}>} carrito - Productos a guardar.
 * @return {void}
 */
const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContador();
};

/**
 * Dibuja la lista de productos y el total dentro de la ventana del carrito.
 * @method dibujarCarrito
 * @return {void}
 */
const dibujarCarrito = () => {
  const lista = document.getElementById("carrito-lista");
  if (lista === null) {
    return;
  }

  const carrito = leerCarrito();
  let contenido = "";

  if (carrito.length === 0) {
    contenido = '<li class="carrito-vacio">Tu carrito está vacío.</li>';
  }

  carrito.forEach((item, indice) => {
    contenido += `<li class="carrito-item">
        <span class="item-info">${item.nombre} - ${formatearPrecio(item.precio * item.cantidad)}</span>
        <span class="item-controles">
          <button type="button" value="${indice}" onclick="cambiarCantidad(this.value, -1)" aria-label="Restar una unidad">-</button>
          <span class="item-cantidad">${item.cantidad}</span>
          <button type="button" value="${indice}" onclick="cambiarCantidad(this.value, 1)" aria-label="Sumar una unidad">+</button>
          <button type="button" class="boton-eliminar" value="${indice}" onclick="eliminarDelCarrito(this.value)" aria-label="Eliminar del carrito">✕</button>
        </span>
      </li>`;
  });

  lista.innerHTML = contenido;
  document.getElementById("carrito-total").innerText = "Total: " + formatearPrecio(calcularSubtotal(carrito));
};

/**
 * Deja una cantidad dentro del rango permitido, entre 1 y el máximo por producto.
 * @method ajustarCantidad
 * @param {number} cantidad - Cantidad pedida.
 * @return {number} Cantidad dentro del rango permitido.
 */
const ajustarCantidad = (cantidad) => {
  if (cantidad < 1) {
    return 1;
  }
  if (cantidad > CANTIDAD_MAXIMA) {
    return CANTIDAD_MAXIMA;
  }
  return cantidad;
};

/**
 * Agrega un producto al carrito; si ya estaba, suma la cantidad sin superar el máximo.
 * @method agregarAlCarrito
 * @param {{nombre: string, precio: number, cantidad: number}} item - Producto a agregar.
 * @return {void}
 */
const agregarAlCarrito = (item) => {
  const carrito = leerCarrito();
  let encontrado = false;

  carrito.forEach((guardado) => {
    if (guardado.nombre === item.nombre) {
      guardado.cantidad = ajustarCantidad(guardado.cantidad + item.cantidad);
      encontrado = true;
    }
  });

  if (!encontrado) {
    carrito.push(item);
  }

  guardarCarrito(carrito);
  dibujarCarrito();
};

/**
 * Suma o resta unidades de un producto del carrito, entre 1 y el máximo permitido.
 * @method cambiarCantidad
 * @param {string} posicion - Posición del producto dentro del carrito (valor del botón presionado).
 * @param {number} variacion - Unidades a sumar (positivo) o restar (negativo).
 * @return {void}
 */
const cambiarCantidad = (posicion, variacion) => {
  const carrito = leerCarrito();
  const item = carrito[Number(posicion)];
  if (item === undefined) {
    return;
  }
  item.cantidad = ajustarCantidad(item.cantidad + variacion);
  guardarCarrito(carrito);
  dibujarCarrito();
};

/**
 * Pregunta si se quiere quitar un producto del carrito y, si el usuario confirma, lo quita.
 * @method eliminarDelCarrito
 * @param {string} posicion - Posición del producto dentro del carrito (valor del botón presionado).
 * @return {void}
 */
const eliminarDelCarrito = (posicion) => {
  const item = leerCarrito()[Number(posicion)];
  if (item === undefined) {
    return;
  }
  pedirConfirmacion(`¿Querés quitar "${item.nombre}" del carrito?`, "Eliminar", () => {
    const carrito = leerCarrito();
    carrito.splice(Number(posicion), 1);
    guardarCarrito(carrito);
    dibujarCarrito();
  });
};

/**
 * Elimina todos los productos del carrito.
 * @method vaciarCarrito
 * @return {void}
 */
const vaciarCarrito = () => {
  guardarCarrito([]);
  dibujarCarrito();
};

/**
 * Pregunta si se quiere vaciar el carrito y, si el usuario confirma, lo vacía.
 * Si el carrito ya está vacío no pregunta nada.
 * @method confirmarVaciarCarrito
 * @param {Function} alVaciar - Función que vacía el carrito y actualiza la pantalla.
 * @return {void}
 */
const confirmarVaciarCarrito = (alVaciar = vaciarCarrito) => {
  if (leerCarrito().length === 0) {
    return;
  }
  pedirConfirmacion("Se van a quitar todos los productos del carrito.", "Vaciar carrito", alVaciar);
};

/**
 * Oculta la ventana del carrito.
 * @method cerrarCarrito
 * @return {void}
 */
const cerrarCarrito = () => {
  document.getElementById("carrito-modal").classList.add("oculto");
};

/**
 * Muestra u oculta la ventana del carrito con su contenido actualizado.
 * @method alternarCarrito
 * @return {void}
 */
const alternarCarrito = () => {
  dibujarCarrito();
  document.getElementById("carrito-modal").classList.toggle("oculto");
};

/**
 * Abre o cierra el menú de navegación.
 * @method alternarMenu
 * @return {void}
 */
const alternarMenu = () => {
  document.getElementById("menu").classList.toggle("activo");
};

/**
 * Lleva a la página de compra si el carrito tiene productos; si no, avisa al usuario.
 * @method irAlCheckout
 * @return {void}
 */
const irAlCheckout = () => {
  if (leerCarrito().length === 0) {
    mostrarAviso("Tu carrito está vacío. Agregá un producto antes de continuar.");
    return;
  }
  window.location.href = "checkout.html";
};

actualizarContador();
