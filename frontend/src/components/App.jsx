import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";
import Inicio from "@pages/Inicio";
import Categoria from "@pages/Categoria";
import ProductoDetalle from "@pages/ProductoDetalle";
import Carrito from "@pages/Carrito";
import Checkout from "@pages/Checkout";
import NoEncontrado from "@pages/NoEncontrado";

/**
 * Componente raíz: define las rutas de la aplicación.
 * Layout es la ruta principal y las páginas son sus rutas hijas.
 * @method App
 * @return {JSX.Element} Enrutador con todas las páginas del sitio.
 */
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="categoria/:categoria" element={<Categoria />} />
          <Route path="producto/:id" element={<ProductoDetalle />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
