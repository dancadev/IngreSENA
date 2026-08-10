import { BrowserRouter, Route, Routes } from "react-router-dom";

// IMPORTACIONES DE PAGINAS
import Inicio from "../pages/inicio.jsx";
import Login from "../pages/login.jsx";

// IMPORTACIONES DE COMPONENTES
import Menu from "../components/menu.jsx";
import Perfil from "../components/perfil.jsx";
import Historial from "../components/historial.jsx";
import TarjetaResumen from "../components/tarjetaResumen.jsx";

function Rutas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Login />} />
                <Route path="/inicio" element={< Inicio />} />
                <Route path="/perfil" element={< Perfil />} />
                <Route path="/historial" element={< Historial />} />            
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;