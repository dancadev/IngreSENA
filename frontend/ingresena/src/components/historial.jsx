import TarjetaResumen from "./TarjetaResumen";

import {
    FaUsers,
    FaCalendarAlt,
    FaSignInAlt
} from "react-icons/fa";

function Historial() {

    const fecha = new Date().toLocaleDateString("es-CO");

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            {/* Título */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#39A900]">
                    Historial de Accesos
                </h1>

                <p className="text-gray-500 mt-2">
                    Consulta el historial de ingresos y salidas del personal.
                </p>

            </div>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <TarjetaResumen
                    titulo="Empleados Registrados"
                    valor="128"
                    icono={<FaUsers />}
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Accesos Hoy"
                    valor="42"
                    icono={<FaSignInAlt />}
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Fecha"
                    valor={fecha}
                    icono={<FaCalendarAlt />}
                    color="#39A900"
                />

            </div>

            {/* Barra de filtros */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    <input
                        type="text"
                        placeholder="Buscar empleado..."
                        className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                    />

                    <select className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]">
                        <option>Área</option>
                        <option>Sistemas</option>
                        <option>Administración</option>
                        <option>Coordinación</option>
                        <option>Almacén</option>
                    </select>

                    <select className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]">
                        <option>Tipo</option>
                        <option>Entrada</option>
                        <option>Salida</option>
                    </select>

                    <input
                        type="date"
                        className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                    />

                    <div className="flex gap-2">

                        <button className="flex-1 bg-[#39A900] hover:bg-green-700 text-white rounded-lg">
                            Buscar
                        </button>

                        <button className="flex-1 bg-gray-300 hover:bg-gray-400 rounded-lg">
                            Limpiar
                        </button>

                    </div>

                </div>

            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-[#39A900] text-white">

                            <tr>

                                <th className="p-4 text-left">Hora</th>

                                <th className="p-4 text-left">Empleado</th>

                                <th className="p-4 text-left">Área</th>

                                <th className="p-4 text-left">Equipo</th>

                                <th className="p-4 text-left">Tipo</th>

                                <th className="p-4 text-left">Estado</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr className="border-b hover:bg-gray-50">

                                <td className="p-4">08:00 AM</td>

                                <td className="p-4">Juan Pérez</td>

                                <td className="p-4">Sistemas</td>

                                <td className="p-4">Portátil Lenovo</td>

                                <td className="p-4">Entrada</td>

                                <td className="p-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        Permitido
                                    </span>
                                </td>

                            </tr>

                            <tr className="border-b hover:bg-gray-50">

                                <td className="p-4">08:20 AM</td>

                                <td className="p-4">María Gómez</td>

                                <td className="p-4">Administración</td>

                                <td className="p-4">Desktop HP</td>

                                <td className="p-4">Entrada</td>

                                <td className="p-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        Permitido
                                    </span>
                                </td>

                            </tr>

                            <tr className="border-b hover:bg-gray-50">

                                <td className="p-4">09:10 AM</td>

                                <td className="p-4">Carlos Díaz</td>

                                <td className="p-4">Coordinación</td>

                                <td className="p-4">Monitor Dell</td>

                                <td className="p-4">Salida</td>

                                <td className="p-4">
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                        Salida
                                    </span>
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Historial;