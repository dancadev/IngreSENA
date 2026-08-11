import { useState } from "react";

import {
    descargarReporteAccesos,
    descargarReporteEquipos,
    descargarReporteEmpleados,
    descargarReporteVisitantes,
} from "../services/reportes.js";

function Reportes() {

    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [descargando, setDescargando] = useState("");
    const [mensaje, setMensaje] = useState("");

    const hoy = new Date().toISOString().split("T")[0];

    const manejarDescarga = async (tipo, accion) => {

        setDescargando(tipo);
        setMensaje("");

        try {

            await accion();

            setMensaje("Reporte descargado correctamente.");

        } catch (error) {

            console.error(error);

            setMensaje("No fue posible generar el reporte.");

        }

        setDescargando("");
    };

    const descargarAccesos = () => {

        if (!desde || !hasta) {

            setMensaje("Debe seleccionar las fechas inicial y final.");

            return;
        }

        manejarDescarga("accesos", () => descargarReporteAccesos(desde, hasta));
    };

    const tarjetaReporte = ({ titulo, descripcion, icono, boton, onClick, descargandoId }) => {

        return (

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-[#39A900]">

                <div className="flex items-center gap-4 mb-4">

                    <div className="w-14 h-14 rounded-full bg-[#39A900] flex justify-center items-center text-white text-2xl">
                        {icono}
                    </div>

                    <div>

                        <h3 className="text-xl font-bold text-gray-800">
                            {titulo}
                        </h3>

                        <p className="text-gray-500 text-sm">
                            {descripcion}
                        </p>

                    </div>

                </div>

                {boton}

                <button
                    onClick={onClick}
                    disabled={descargando === descargandoId}
                    className="mt-4 w-full bg-[#39A900] hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl py-3 font-medium transition"
                >
                    {descargando === descargandoId ? "Generando..." : "📥 Descargar Excel"}
                </button>

            </div>

        );

    };

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            {/* TÍTULO */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#39A900]">
                    Reportes
                </h1>

                <p className="text-gray-500 mt-2">
                    Genera y descarga reportes en formato Excel (.xlsx).
                </p>

            </div>

            {/* MENSAJE */}

            {mensaje && (
                <div className="mb-8 bg-white rounded-2xl shadow-md p-4 border-l-4 border-[#39A900] text-gray-700">
                    {mensaje}
                </div>
            )}

            {/* REPORTE DE ACCESOS (con rango de fechas) */}

            {tarjetaReporte({
                titulo: "Reporte de Accesos",
                descripcion: "Entradas y salidas registradas en un rango de fechas.",
                icono: "🪪",
                descargandoId: "accesos",
                onClick: descargarAccesos,
                boton: (
                    <div className="grid grid-cols-2 gap-3 mb-2">

                        <div>

                            <label className="block text-sm text-gray-500 mb-1">
                                Desde
                            </label>

                            <input
                                type="date"
                                max={hasta || undefined}
                                value={desde}
                                onChange={(e) => setDesde(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-gray-500 mb-1">
                                Hasta
                            </label>

                            <input
                                type="date"
                                max={hoy}
                                min={desde || undefined}
                                value={hasta}
                                onChange={(e) => setHasta(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                            />

                        </div>

                    </div>
                ),
            })}

            {/* REPORTS RESTANTES */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                {tarjetaReporte({
                    titulo: "Reporte de Equipos",
                    descripcion: "Inventario completo de equipos registrados.",
                    icono: "💻",
                    descargandoId: "equipos",
                    onClick: () => manejarDescarga("equipos", descargarReporteEquipos),
                    boton: null,
                })}

                {tarjetaReporte({
                    titulo: "Reporte de Empleados",
                    descripcion: "Listado de empleados del sistema.",
                    icono: "👥",
                    descargandoId: "empleados",
                    onClick: () => manejarDescarga("empleados", descargarReporteEmpleados),
                    boton: null,
                })}

                {tarjetaReporte({
                    titulo: "Reporte de Visitantes",
                    descripcion: "Visitantes registrados con sus movimientos.",
                    icono: "👤",
                    descargandoId: "visitantes",
                    onClick: () => manejarDescarga("visitantes", descargarReporteVisitantes),
                    boton: null,
                })}

            </div>

        </div>

    );

}

export default Reportes;
