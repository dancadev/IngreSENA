import { useState } from "react";

import Menu from "../components/menu.jsx";
import Perfil from "../components/perfil.jsx";
import Historial from "../components/historial.jsx";
import Empleados from"../components/empleados.jsx";

function Inicio() {

    const [vista, setVista] = useState("perfil");

    return (

        <div className="flex min-h-screen bg-slate-100">

            <aside className="w-[20%]">
                < Menu cambiarVista={setVista} />
            </aside>

            <main className="w-[80%] bg-slate-100 overflow-y-auto p-6">

                { vista === "perfil" && < Perfil />}
                { vista === "historial" && < Historial/>}
                {vista === "empleados" && <Empleados />}
                
            </main>
            
        </div>

    );
}

export default Inicio;