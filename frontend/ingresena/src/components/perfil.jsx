function Perfil() {

    return (

        <div className="bg-slate-100 min-h-screen flex justify-center items-start p-10">

            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-lg p-8">

                <div className="flex">

                    {/* FOTO */}
                    <div className="w-1/4 flex justify-center">
                        <img
                            src=""
                            alt="fotoPerfil"
                            className="w-40 h-40 rounded-full object-cover border-4 border-purple-200"
                        />
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="w-3/4">

                        <div className="flex justify-between items-center">

                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">
                                    Nombre del Empleado
                                </h1>

                                <p className="text-green-600 font-semibold">
                                    Cargo
                                </p>
                            </div>

                            <button className="bg-slate-100 hover:bg-slate-200 p-3 rounded-full">
                                ✏️
                            </button>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 text-slate-700">

                            <div>
                                <span className="font-semibold">
                                    Nombre:
                                </span>
                                <p>Juan Pérez</p>
                            </div>

                            <div>
                                <span className="font-semibold">
                                    C.C:
                                </span>
                                <p>123456789</p>
                            </div>

                            <div>
                                <span className="font-semibold">
                                    Teléfono:
                                </span>
                                <p>3001234567</p>
                            </div>

                            <div>
                                <span className="font-semibold">
                                    Email:
                                </span>
                                <p>juan@sena.edu.co</p>
                            </div>

                            <div className="col-span-2">
                                <span className="font-semibold">
                                    Dirección:
                                </span>
                                <p>Calle 10 # 20 - 30</p>
                            </div>

                        </div>

                        {/* BOTONES */}
                        <div className="flex gap-4 mt-10">

                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">
                                Registrar Equipo
                            </button>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
                                Equipo Ya Registrado
                            </button>

                            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition">
                                No Ingresa Equipo
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Perfil;