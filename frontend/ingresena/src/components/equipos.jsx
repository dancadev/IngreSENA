import { useState, useEffect } from "react";

import TarjetaResumen from "./tarjetaResumen.jsx";
import BarraFiltrosEquipos from "./barraFiltrosEquipos.jsx";
import TablaEquipos from "./tablaEquipos.jsx";
import ModalRegistrarEquipo from "./modalRegistroEquipos.jsx";

import { listarEquipos } from "../services/equipos.js";

function Equipos() {

    const [equipos, setEquipos] = useState([]);
    const [filtros, setFiltros] = useState({});
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [recarga, setRecarga] = useState(0);

    useEffect(() => {

        let activo = true;

        listarEquipos(filtros)
            .then((datos) => {
                if (activo) setEquipos(datos);
            })
            .catch((error) => {
                console.error(error);
                if (activo) setEquipos([]);
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

    const portatiles = equipos.filter((e) => e.tipo_equipo === "Portátil").length;
    const tablets = equipos.filter((e) => e.tipo_equipo === "Tablet").length;
    const otros = equipos.length - portatiles - tablets;

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            {/* TÍTULO */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#39A900]">
                    Gestión de Equipos
                </h1>

                <p className="text-gray-500 mt-2">
                    Administra los portátiles, tablets y demás equipos de la institución.
                </p>

            </div>

            {/* TARJETAS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <TarjetaResumen
                    titulo="Total Equipos"
                    valor={equipos.length}
                    icono="💻"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Portátiles"
                    valor={portatiles}
                    icono="🖥️"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Tablets"
                    valor={tablets}
                    icono="📱"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Otros"
                    valor={otros}
                    icono="🖨️"
                    color="#39A900"
                />

            </div>

            {/* FILTROS */}

            <BarraFiltrosEquipos
                alBuscar={alBuscar}
                abrirModal={() => setModalAbierto(true)}
            />

            {/* TABLA */}

            <TablaEquipos
                equipos={equipos}
                cargando={cargando}
            />

            {/* MODAL */}

            <ModalRegistrarEquipo
                abierto={modalAbierto}
                cerrar={() => setModalAbierto(false)}
                alRegistrar={() => setRecarga((r) => r + 1)}
            />

        </div>

    );

}

export default Equipos;
