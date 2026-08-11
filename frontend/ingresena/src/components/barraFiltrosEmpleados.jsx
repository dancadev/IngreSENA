import { useState } from "react";

function BarraFiltrosEmpleados({ alBuscar, abrirModal }) {

    const [buscar, setBuscar] = useState("");
    const [area, setArea] = useState("");
    const [estado, setEstado] = useState("");

    const buscarEmpleados = () => {

        alBuscar({
            buscar,
            area,
            estado,
        });

    };

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

                {/* BUSCAR POR NOMBRE / CÉDULA / CARGO */}

                <input
                    type="text"
                    placeholder="Buscar por nombre, cédula o cargo..."
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />

                {/* ÁREA */}

                <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                >

                    <option value="">
                        Todas las áreas
                    </option>

                    <option value="Sistemas">
                        Sistemas
                    </option>

                    <option value="Administración">
                        Administración
                    </option>

                    <option value="Coordinación">
                        Coordinación
                    </option>

                    <option value="Almacén">
                        Almacén
                    </option>

                </select>

                {/* ESTADO */}

                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                >

                    <option value="">
                        Todos los estados
                    </option>

                    <option value="Activo">
                        Activo
                    </option>

                    <option value="Inactivo">
                        Inactivo
                    </option>

                </select>

                {/* BUSCAR */}

                <button
                    onClick={buscarEmpleados}
                    className="bg-[#39A900] hover:bg-green-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Buscar
                </button>

                {/* REGISTRAR */}

                <button
                    onClick={abrirModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Registrar Empleado
                </button>

            </div>

        </div>

    );

}

export default BarraFiltrosEmpleados;