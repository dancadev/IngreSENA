import { useState } from "react";

function BarraFiltrosEquipos({ alBuscar, abrirModal }) {

    const [buscar, setBuscar] = useState("");
    const [tipoEquipo, setTipoEquipo] = useState("");
    const [area, setArea] = useState("");

    const buscarEquipos = () => {

        alBuscar({
            buscar,
            tipo_equipo: tipoEquipo,
            area,
        });

    };

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* BUSCAR */}

                <input
                    type="text"
                    placeholder="Buscar por usuario, cédula, serial o código..."
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />

                {/* TIPO DE EQUIPO */}

                <select
                    value={tipoEquipo}
                    onChange={(e) => setTipoEquipo(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                >

                    <option value="">
                        Todos los tipos
                    </option>

                    <option>Portátil</option>
                    <option>Tablet</option>
                    <option>Desktop</option>
                    <option>Monitor</option>
                    <option>Impresora</option>

                </select>

                {/* ÁREA */}

                <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                >

                    <option value="">
                        Todas las áreas
                    </option>

                    <option>Sistemas</option>
                    <option>Administración</option>
                    <option>Coordinación</option>
                    <option>Almacén</option>

                </select>

                {/* BUSCAR */}

                <button
                    onClick={buscarEquipos}
                    className="bg-[#39A900] hover:bg-green-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Buscar
                </button>

                {/* REGISTRAR */}

                <button
                    onClick={abrirModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Registrar Equipo
                </button>

            </div>

        </div>

    );

}

export default BarraFiltrosEquipos;
