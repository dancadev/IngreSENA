function TablaEmpleados({ empleados, cargando }) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#39A900] text-white">

                        <tr>

                            <th className="p-4 text-left">Código</th>

                            <th className="p-4 text-left">Nombre</th>

                            <th className="p-4 text-left">Cédula</th>

                            <th className="p-4 text-left">Cargo</th>

                            <th className="p-4 text-left">Área</th>

                            <th className="p-4 text-left">Estado</th>

                            <th className="p-4 text-center">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {cargando && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">
                                    Cargando empleados...
                                </td>
                            </tr>
                        )}

                        {!cargando && empleados.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">
                                    No se encontraron empleados.
                                </td>
                            </tr>
                        )}

                        {empleados.map((empleado) => (

                            <tr
                                key={empleado.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-mono text-sm">
                                    {empleado.codigo_barras}
                                </td>

                                <td className="p-4">
                                    <div className="flex items-center gap-3">

                                        <img
                                            src="https://placehold.co/45x45"
                                            alt="Empleado"
                                            className="w-9 h-9 rounded-full"
                                        />

                                        <span className="font-medium">
                                            {empleado.nombre}
                                        </span>

                                    </div>
                                </td>

                                <td className="p-4">
                                    {empleado.tipo_documento} {empleado.documento}
                                </td>

                                <td className="p-4">
                                    {empleado.cargo}
                                </td>

                                <td className="p-4">
                                    {empleado.area}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-white ${
                                            empleado.estado === "Activo"
                                                ? "bg-green-600"
                                                : "bg-red-500"
                                        }`}
                                    >
                                        {empleado.estado}
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

export default TablaEmpleados;
