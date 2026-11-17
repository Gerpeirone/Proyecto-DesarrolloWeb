import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS } from "@data/tienda";

/**
 * Encabezado del sitio: logo, acceso al carrito y menú de navegación.
 * @method Header
 * @param {object} props - Propiedades del componente.
 * @param {number} props.cantidad - Unidades que hay en el carrito.
 * @return {JSX.Element} Encabezado con la navegación entre páginas.
 */
const Header = ({ cantidad }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  /**
   * Abre o cierra el menú de navegación.
   * @method alternarMenu
   * @return {void}
   */
  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  /**
   * Cierra el menú de navegación.
   * @method cerrarMenu
   * @return {void}
   */
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header>
      <h1 className="logo">
        <Link to="/" onClick={cerrarMenu}>
          CrewLab
        </Link>
      </h1>

      <div className="acciones">
        <Link to="/carrito" className="carrito" aria-label="Ver carrito" onClick={cerrarMenu}>
          🛒
          {cantidad > 0 && <span className="carrito-contador">{cantidad}</span>}
        </Link>
        <button
          type="button"
          className="menu-hamburguesa"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={alternarMenu}
        >
          ☰
        </button>
      </div>

      <nav
        className={menuAbierto ? "menu-desplegable activo" : "menu-desplegable"}
        aria-label="Navegación principal"
      >
        <ul>
          <li>
            <Link to="/" onClick={cerrarMenu}>
              Inicio
            </Link>
          </li>
          {CATEGORIAS.map((categoria) => (
            <li key={categoria.id}>
              <Link to={`/categoria/${categoria.id}`} onClick={cerrarMenu}>
                {categoria.nombre}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/carrito" onClick={cerrarMenu}>
              Carrito
            </Link>
          </li>
          <li>
            <Link to="/checkout" onClick={cerrarMenu}>
              Finalizar compra
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
