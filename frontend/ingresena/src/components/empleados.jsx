import { useState, useEffect } from "react";

import TarjetaResumen from "./tarjetaResumen.jsx";
import BarraFiltrosEmpleados from "./barraFiltrosEmpleados.jsx";
import TablaEmpleados from "./tablaEmpleados.jsx";
import ModalEmpleado from "./modalEmpleados.jsx";

import { listarEmpleados } from "../services/empleados.js";

function Empleados() {

    const [empleados, setEmpleados] = useState([]);
    const [filtros, setFiltros] = useState({});
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [recarga, setRecarga] = useState(0);

    useEffect(() => {

        let activo = true;

        listarEmpleados(filtros)
            .then((datos) => {
                if (activo) setEmpleados(datos);
            })
            .catch((error) => {
                console.error(error);
                if (activo) setEmpleados([]);
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };

    }, [filtros, recarga]);

    const alBuscar = (nuevosFiltros) => {

        setCargando(true);
        setFiltros(nuevosFiltros);

    };

    const activos = empleados.filter((e) => e.estado === "Activo").length;
    const areas = new Set(empleados.map((e) => e.area)).size;

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
                    valor={empleados.length}
                    icono="👥"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Activos"
                    valor={activos}
                    icono="✅"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Áreas"
                    valor={areas}
                    icono="🏢"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Nuevos"
                    valor={empleados.length - activos}
                    icono="🆕"
                    color="#39A900"
                />

            </div>

            {/* FILTROS */}

            <BarraFiltrosEmpleados
                alBuscar={alBuscar}
                abrirModal={() => setModalAbierto(true)}
            />

            {/* TABLA */}

            <TablaEmpleados
                empleados={empleados}
                cargando={cargando}
            />

            {/* MODAL */}

            <ModalEmpleado
                abierto={modalAbierto}
                cerrar={() => setModalAbierto(false)}
                alRegistrar={() => setRecarga((r) => r + 1)}
            />

        </div>

    );

}

export default Empleados;
