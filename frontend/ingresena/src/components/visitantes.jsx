import { useState, useEffect } from "react";

import TarjetaResumen from "./tarjetaResumen.jsx";
import BarraFiltrosVisitantes from "./barraFiltrosVisitantes.jsx";
import TablaVisitantes from "./tablaVisitantes.jsx";
import ModalVisitante from "./modalVisitantes.jsx";

import { listarVisitantes } from "../services/visitantes.js";

function Visitantes() {

    const [visitantes, setVisitantes] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [recarga, setRecarga] = useState(0);

    useEffect(() => {

        let activo = true;

        listarVisitantes()
            .then((datos) => {
                if (activo) setVisitantes(datos);
            })
            .catch((error) => {
                console.error(error);
                if (activo) setVisitantes([]);
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };

    }, [recarga]);

    const dentro = visitantes.filter((v) => v.estado === "Dentro").length;
    const enEspera = visitantes.filter((v) => v.estado === "En espera").length;
    const fuera = visitantes.filter((v) => v.estado === "Fuera").length;

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            {/* TÍTULO */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#39A900]">
                    Gestión de Visitantes
                </h1>

                <p className="text-gray-500 mt-2">
                    Registra y controla las personas externas que ingresan a la institución.
                </p>

            </div>

            {/* TARJETAS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <TarjetaResumen
                    titulo="Total Visitantes"
                    valor={visitantes.length}
                    icono="👤"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="Dentro"
                    valor={dentro}
                    icono="🏢"
                    color="#39A900"
                />

                <TarjetaResumen
                    titulo="En Espera"
                    valor={enEspera}
                    icono="⏳"
                    color="#F59E0B"
                />

                <TarjetaResumen
                    titulo="Fuera"
                    valor={fuera}
                    icono="🚪"
                    color="#DC2626"
                />

            </div>

            {/* FILTROS */}

            <BarraFiltrosVisitantes
                abrirModal={() => setModalAbierto(true)}
            />

            {/* TABLA */}

            <TablaVisitantes
                visitantes={visitantes}
                cargando={cargando}
            />

            {/* MODAL */}

            <ModalVisitante
                abierto={modalAbierto}
                cerrar={() => setModalAbierto(false)}
                alRegistrar={() => setRecarga((r) => r + 1)}
            />

        </div>

    );

}

export default Visitantes;
