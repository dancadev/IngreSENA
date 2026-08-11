import { BrowserRouter, Route, Routes } from "react-router-dom";

// IMPORTACIONES DE PAGINAS
import Inicio from "../pages/inicio.jsx";
import Login from "../pages/login.jsx";

// IMPORTACIONES DE COMPONENTES
import Perfil from "../components/perfil.jsx";
import Historial from "../components/historial.jsx";
import Equipos from "../components/equipos.jsx";
import ControlAccesos from "../components/controlAccesos.jsx";
import Visitantes from "../components/visitantes.jsx";
import Reportes from "../components/reportes.jsx";

function Rutas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Login />} />
                <Route path="/inicio" element={< Inicio />} />
                <Route path="/perfil" element={< Perfil />} />
                <Route path="/historial" element={< Historial />} />
                <Route path="/equipos" element={< Equipos />} />
                <Route path="/accesos" element={< ControlAccesos />} />
                <Route path="/visitantes" element={< Visitantes />} />
                <Route path="/reportes" element={< Reportes />} />            
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;