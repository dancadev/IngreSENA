import { BrowserRouter, Route, Routes } from "react-router-dom";

// IMPORTACIONES DE PAGINAS
import Inicio from "../pages/inicio.jsx";
import Login from "../pages/login.jsx";

function Rutas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/inicio" element={<Inicio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;