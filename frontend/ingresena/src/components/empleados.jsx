import { useState } from "react";

import TarjetaResumen from "./tarjetaResumen.jsx";
import BarraFiltrosEmpleados from "./barraFiltrosEmpleados.jsx";
import TablaEmpleados from "./tablaEmpleados.jsx";
import ModalEmpleado from "./modalEmpleados.jsx";

function Empleados() {

    const [modalAbierto, setModalAbierto] = useState(false);

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            {/* TÍTULO */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#39A900]">
                    Gestión de Empleados
                </h1>

                <p className="text-gray-500 mt-2">
                    Administra todos los funcionarios registrados en el sistema.
                </p>

            </div>


            {/* TARJETAS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <TarjetaResumen
                    titulo="Total Empleados"
                    valor="256"
                    icono="👥"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Activos"
                    valor="248"
                    icono="✅"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Áreas"
                    valor="12"
                    icono="🏢"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Nuevos"
                    valor="5"
                    icono="🆕"
                    color="#39A900"
                />

            </div>


            {/* FILTROS */}

            <BarraFiltrosEmpleados
                abrirModal={() => setModalAbierto(true)}
            />


            {/* TABLA */}

            <TablaEmpleados />


            {/* MODAL */}

            <ModalEmpleado
                abierto={modalAbierto}
                cerrar={() => setModalAbierto(false)}
            />

        </div>

    );

}

export default Empleados;