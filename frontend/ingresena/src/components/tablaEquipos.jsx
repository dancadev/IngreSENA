function TablaEquipos({ equipos, cargando }) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#39A900] text-white">

                        <tr>

                            <th className="p-4 text-left">Código Barras</th>

                            <th className="p-4 text-left">Usuario</th>

                            <th className="p-4 text-left">Tipo</th>

                            <th className="p-4 text-left">Marca</th>

                            <th className="p-4 text-left">Modelo</th>

                            <th className="p-4 text-left">Serial</th>

                            <th className="p-4 text-left">Área</th>

                            <th className="p-4 text-center">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {cargando && (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-500">
                                    Cargando equipos...
                                </td>
                            </tr>
                        )}

                        {!cargando && equipos.length === 0 && (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-500">
                                    No se encontraron equipos.
                                </td>
                            </tr>
                        )}

                        {equipos.map((equipo) => (

                            <tr
                                key={equipo.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-mono text-sm">
                                    {equipo.codigo_barras}
                                </td>

                                <td className="p-4">
                                    {equipo.usuario_asignado}
                                </td>

                                <td className="p-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        {equipo.tipo_equipo}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {equipo.marca}
                                </td>

                                <td className="p-4">
                                    {equipo.modelo}
                                </td>

                                <td className="p-4 font-mono text-sm">
                                    {equipo.serial}
                                </td>

                                <td className="p-4">
                                    {equipo.area}
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

export default TablaEquipos;
