import { useState } from "react";
import { registrarVisitante } from "../services/visitantes.js";

function ModalVisitante({ abierto, cerrar, alRegistrar }) {

    const [visitante, setVisitante] = useState({

        nombre: "",
        tipo_documento: "CC",
        documento: "",
        empresa: "",
        motivo_visita: "",
        empleado_a_visitar: "",
        telefono: "",
        correo: "",

    });

    if (!abierto) return null;

    const handleChange = (e) => {

        setVisitante({
            ...visitante,
            [e.target.name]: e.target.value,
        });

    };

    const guardarVisitante = async (e) => {

        e.preventDefault();

        try {

            const respuesta = await registrarVisitante(visitante);

            if (respuesta.id) {

                alert("Visitante registrado correctamente");

                alRegistrar?.();

                cerrar();

            } else {

                alert("Error al registrar el visitante");

            }

        } catch (error) {

            console.error(error);

            alert("Error al registrar el visitante");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-5 overflow-y-auto">

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                <div className="p-8">

                    <div className="flex justify-between items-center mb-8">

                        <h2 className="text-3xl font-bold text-[#39A900]">
                            Registrar Visitante
                        </h2>

                        <button
                            onClick={cerrar}
                            className="text-3xl hover:text-red-500"
                        >
                            ×
                        </button>

                    </div>

                    <form
                        onSubmit={guardarVisitante}
                        className="space-y-8"
                    >

                        {/* DATOS PERSONALES */}

                        <div>

                            <h3 className="text-xl font-bold text-[#39A900] mb-4">
                                Información Personal
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <input
                                    name="nombre"
                                    placeholder="Nombre Completo"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                                    onChange={handleChange}
                                    required
                                />

                                <select
                                    name="tipo_documento"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                                    onChange={handleChange}
                                >

                                    <option>CC</option>
                                    <option>CE</option>
                                    <option>TI</option>
                                    <option>P</option>

                                </select>

                                <input
                                    name="documento"
                                    placeholder="Número Documento"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    name="telefono"
                                    placeholder="Teléfono"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                                    onChange={handleChange}
                                />

                                <input
                                    name="correo"
                                    type="email"
                                    placeholder="Correo"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900] md:col-span-2"
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        {/* INFORMACIÓN DE LA VISITA */}

                        <div>

                            <h3 className="text-xl font-bold text-[#39A900] mb-4">
                                Información de la Visita
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <input
                                    name="empresa"
                                    placeholder="Empresa"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                                    onChange={handleChange}
                                />

                                <input
                                    name="empleado_a_visitar"
                                    placeholder="Empleado a Visitar"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900]"
                                    onChange={handleChange}
                                />

                                <input
                                    name="motivo_visita"
                                    placeholder="Motivo de la Visita"
                                    className="border rounded-lg p-3 focus:outline-none focus:border-[#39A900] md:col-span-2"
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        {/* CÓDIGO DE BARRAS */}

                        <div>

                            <label className="font-semibold">
                                Código de Barras
                            </label>

                            <input
                                disabled
                                value="Se generará automáticamente"
                                className="w-full border rounded-lg p-3 bg-gray-100 mt-2"
                            />

                        </div>

                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={cerrar}
                                className="bg-gray-300 px-6 py-3 rounded-lg"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-[#39A900] text-white px-6 py-3 rounded-lg hover:bg-green-700"
                            >
                                Registrar Visitante
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default ModalVisitante;
