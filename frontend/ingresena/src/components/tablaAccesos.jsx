function TablaAccesos({ accesos }) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#39A900] text-white">

                        <tr>

                            <th className="p-4 text-left">Fecha y Hora</th>

                            <th className="p-4 text-left">Código</th>

                            <th className="p-4 text-left">Registro</th>

                            <th className="p-4 text-left">Movimiento</th>

                            <th className="p-4 text-left">Detalle</th>

                            <th className="p-4 text-center">Estado</th>

                        </tr>

                    </thead>

                    <tbody>

                        {accesos.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    Aún no hay registros de acceso.
                                </td>
                            </tr>
                        )}

                        {accesos.map((acceso) => {

                            const fecha = new Date(acceso.fecha_hora);
                            const hora = fecha.toLocaleTimeString("es-CO");
                            const dia = fecha.toLocaleDateString("es-CO");

                            const detalle =
                                acceso.empleado_detalle?.nombre
                                || acceso.visitante_detalle?.nombre
                                || (acceso.equipo_detalle
                                    ? `${acceso.equipo_detalle.marca} ${acceso.equipo_detalle.modelo}`
                                    : acceso.motivo || "Desconocido");

                            return (

                                <tr
                                    key={acceso.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4 text-sm">
                                        <span className="font-medium">{dia}</span>
                                        <span className="text-gray-500"> · {hora}</span>
                                    </td>

                                    <td className="p-4 font-mono text-sm">
                                        {acceso.codigo_barras}
                                    </td>

                                    <td className="p-4">
                                        {acceso.tipo_registro}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-sm ${
                                                acceso.tipo === "Entrada"
                                                    ? "bg-green-600"
                                                    : "bg-orange-500"
                                            }`}
                                        >
                                            {acceso.tipo}
                                        </span>
                                    </td>

                                    <td className="p-4 text-sm text-gray-600">
                                        {detalle}
                                    </td>

                                    <td className="p-4 text-center">

                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-sm ${
                                                acceso.estado === "Permitido"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        >
                                            {acceso.estado}
                                        </span>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TablaAccesos;
