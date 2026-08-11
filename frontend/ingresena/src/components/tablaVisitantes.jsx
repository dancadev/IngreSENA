function TablaVisitantes({ visitantes, cargando }) {

    const colorEstado = (estado) => {
        if (estado === "Dentro") return "bg-green-600";
        if (estado === "En espera") return "bg-yellow-500";
        return "bg-gray-500";
    };

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#39A900] text-white">

                        <tr>

                            <th className="p-4 text-left">Código</th>

                            <th className="p-4 text-left">Nombre</th>

                            <th className="p-4 text-left">Documento</th>

                            <th className="p-4 text-left">Empresa</th>

                            <th className="p-4 text-left">Motivo</th>

                            <th className="p-4 text-left">A Visitar</th>

                            <th className="p-4 text-left">Estado</th>

                            <th className="p-4 text-center">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {cargando && (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-500">
                                    Cargando visitantes...
                                </td>
                            </tr>
                        )}

                        {!cargando && visitantes.length === 0 && (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-500">
                                    No se encontraron visitantes.
                                </td>
                            </tr>
                        )}

                        {visitantes.map((visitante) => (

                            <tr
                                key={visitante.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-mono text-sm">
                                    {visitante.codigo_barras}
                                </td>

                                <td className="p-4 font-medium">
                                    {visitante.nombre}
                                </td>

                                <td className="p-4">
                                    {visitante.tipo_documento} {visitante.documento}
                                </td>

                                <td className="p-4">
                                    {visitante.empresa || "—"}
                                </td>

                                <td className="p-4">
                                    {visitante.motivo_visita || "—"}
                                </td>

                                <td className="p-4">
                                    {visitante.empleado_a_visitar || "—"}
                                </td>

                                <td className="p-4">

                                    <span className={`px-3 py-1 rounded-full text-white text-sm ${colorEstado(visitante.estado)}`}>
                                        {visitante.estado}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-2">

                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                                            Ver
                                        </button>

                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">
                                            Editar
                                        </button>

                                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                                            Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TablaVisitantes;
