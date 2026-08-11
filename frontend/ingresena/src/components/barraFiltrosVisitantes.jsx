function BarraFiltrosVisitantes({ abrirModal }) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

                {/* BUSCAR */}

                <input
                    type="text"
                    placeholder="Buscar visitante..."
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />

                {/* DOCUMENTO */}

                <input
                    type="text"
                    placeholder="Número de documento..."
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />

                {/* EMPRESA */}

                <input
                    type="text"
                    placeholder="Empresa..."
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                />

                {/* ESTADO */}

                <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#39A900]">

                    <option value="">
                        Todos los estados
                    </option>

                    <option>En espera</option>
                    <option>Dentro</option>
                    <option>Fuera</option>

                </select>

                {/* BUSCAR */}

                <button className="bg-[#39A900] hover:bg-green-700 text-white rounded-lg px-4 py-3 transition">
                    Buscar
                </button>

                {/* REGISTRAR */}

                <button
                    onClick={abrirModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition"
                >
                    Registrar Visitante
                </button>

            </div>

        </div>

    );

}

export default BarraFiltrosVisitantes;
