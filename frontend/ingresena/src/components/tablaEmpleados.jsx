function TablaEmpleados() {

    const empleados = [

        {
            id: 1,
            nombre: "Juan Pérez",
            cedula: "123456789",
            cargo: "Instructor",
            area: "Sistemas",
            estado: "Activo"
        },

        {
            id: 2,
            nombre: "María Gómez",
            cedula: "987654321",
            cargo: "Coordinadora",
            area: "Administración",
            estado: "Activo"
        },

        {
            id: 3,
            nombre: "Carlos Díaz",
            cedula: "112233445",
            cargo: "Instructor",
            area: "Electrónica",
            estado: "Inactivo"
        }

    ];

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#39A900] text-white">

                        <tr>

                            <th className="p-4 text-left">Foto</th>

                            <th className="p-4 text-left">Nombre</th>

                            <th className="p-4 text-left">Cédula</th>

                            <th className="p-4 text-left">Cargo</th>

                            <th className="p-4 text-left">Área</th>

                            <th className="p-4 text-left">Estado</th>

                            <th className="p-4 text-center">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {empleados.map((empleado) => (

                            <tr
                                key={empleado.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">

                                    <img
                                        src="https://placehold.co/45x45"
                                        alt="Empleado"
                                        className="w-11 h-11 rounded-full"
                                    />

                                </td>

                                <td className="p-4">
                                    {empleado.nombre}
                                </td>

                                <td className="p-4">
                                    {empleado.cedula}
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