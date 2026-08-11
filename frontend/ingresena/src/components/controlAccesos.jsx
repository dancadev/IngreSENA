import { useState, useEffect, useRef } from "react";

import TarjetaResumen from "./tarjetaResumen.jsx";
import TablaAccesos from "./tablaAccesos.jsx";

import { listarAccesos, registrarAcceso } from "../services/accesos.js";

function ControlAccesos() {

    const [accesos, setAccesos] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [cargando, setCargando] = useState(false);
    const [resultado, setResultado] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {

        let activo = true;

        listarAccesos()
            .then((datos) => {
                if (activo) setAccesos(datos);
            })
            .catch((error) => {
                console.error(error);
                if (activo) setAccesos([]);
            });

        return () => {
            activo = false;
        };

    }, []);

    // El lector de código de barras funciona como teclado:
    // escribe el código y presiona Enter automáticamente.
    useEffect(() => {
        inputRef.current?.focus();
    }, [resultado]);

    const recargarAccesos = async () => {

        const datos = await listarAccesos();

        setAccesos(datos);
    };

    const procesarLectura = async () => {

        if (!codigo.trim()) return;

        setCargando(true);
        setResultado(null);

        try {

            const datos = await registrarAcceso(codigo.trim());

            setResultado(datos);

            setCodigo("");

            await recargarAccesos();

        } catch (error) {

            console.error(error);

            setResultado({ estado: "Error", motivo: "No fue posible conectar con el servidor." });

        }

        setCargando(false);
        inputRef.current?.focus();
    };

    const manejarTecla = (e) => {

        if (e.key === "Enter") {
            procesarLectura();
        }

    };

    const entradas = accesos.filter((a) => a.tipo === "Entrada").length;
    const salidas = accesos.filter((a) => a.tipo === "Salida").length;
    const denegados = accesos.filter((a) => a.estado === "Denegado").length;

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            {/* TÍTULO */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#39A900]">
                    Control de Accesos
                </h1>

                <p className="text-gray-500 mt-2">
                    Registra entradas y salidas mediante el lector de código de barras.
                </p>

            </div>

            {/* LECTOR */}

            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

                    <div className="flex-1">

                        <label className="block text-gray-600 font-medium mb-2">
                            Leer código de barras
                        </label>

                        <input
                            ref={inputRef}
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            onKeyDown={manejarTecla}
                            placeholder="Pase el lector aquí o escriba el código y presione Enter..."
                            className="w-full border border-gray-300 rounded-lg p-4 font-mono text-lg focus:outline-none focus:border-[#39A900]"
                        />

                    </div>

                    <button
                        onClick={procesarLectura}
                        disabled={cargando}
                        className="bg-[#39A900] hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg px-6 py-4 font-medium transition"
                    >
                        {cargando ? "Registrando..." : "Registrar Acceso"}
                    </button>

                </div>

                {/* RESULTADO DE LA LECTURA */}

                {resultado && (
                    <div
                        className={`mt-6 p-5 rounded-xl border-l-4 ${
                            resultado.estado === "Permitido"
                                ? "bg-green-50 border-green-600"
                                : resultado.estado === "Denegado"
                                    ? "bg-red-50 border-red-500"
                                    : "bg-yellow-50 border-yellow-500"
                        }`}
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-xl font-bold text-gray-800">
                                    {resultado.tipo || "—"} · {resultado.tipo_registro || "Error"}
                                </p>

                                <p className="text-gray-600 mt-1">
                                    Código: <span className="font-mono">{resultado.codigo_barras}</span>
                                </p>

                                {resultado.estado === "Permitido" && (
                                    <p className="text-gray-500 text-sm mt-1">
                                        {resultado.empleado_detalle?.nombre
                                            || resultado.visitante_detalle?.nombre
                                            || `${resultado.equipo_detalle?.marca} ${resultado.equipo_detalle?.modelo}`
                                            || "Registro correcto"}
                                    </p>
                                )}

                                {resultado.motivo && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {resultado.motivo}
                                    </p>
                                )}

                            </div>

                            <span
                                className={`px-4 py-2 rounded-full text-white font-semibold ${
                                    resultado.estado === "Permitido"
                                        ? "bg-green-600"
                                        : resultado.estado === "Denegado"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                }`}
                            >
                                {resultado.estado}
                            </span>

                        </div>

                    </div>
                )}

            </div>

            {/* TARJETAS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <TarjetaResumen
                    titulo="Accesos Registrados"
                    valor={accesos.length}
                    icono="🪪"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Entradas"
                    valor={entradas}
                    icono="➡️"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Salidas"
                    valor={salidas}
                    icono="⬅️"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Denegados"
                    valor={denegados}
                    icono="⛔"
                    color="#DC2626"
                />

            </div>

            {/* TABLA */}

            <TablaAccesos accesos={accesos} />

        </div>

    );

}

export default ControlAccesos;
