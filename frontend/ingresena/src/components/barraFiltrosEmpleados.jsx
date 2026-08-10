function BarraFiltrosEmpleados({ abrirModal }) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

                {/* BUSCAR POR NOMBRE */}

                <input
                    type="text"
                    placeholder="Buscar empleado..."
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />


                {/* BUSCAR POR CÉDULA */}

                <input
                    type="text"
                    placeholder="Número de cédula..."
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />


                {/* ÁREA */}

                <select
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                >

                    <option value="">
                        Todas las áreas
                    </option>

                    <option value="Sistemas">
                        Sistemas
                    </option>

                    <option value="Administracion">
                        Administración
                    </option>

                    <option value="Coordinacion">
                        Coordinación
                    </option>

                    <option value="Almacen">
                        Almacén
                    </option>

                </select>


                {/* ESTADO */}

                <select
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                >

                    <option value="">
                        Todos los estados
                    </option>

                    <option value="Activo">
                        Activo
                    </option>

                    <option value="Inactivo">
                        Inactivo
                    </option>

                </select>


                {/* BUSCAR */}

                <button
                    className="bg-[#39A900] hover:bg-green-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Buscar
                </button>


                {/* REGISTRAR */}

                <button
                    onClick={abrirModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Registrar Empleado
                </button>

            </div>

        </div>

    );

}

export default BarraFiltrosEmpleados;