import { useState } from "react";
import { registrarEquipo } from "../services/equipos.js";

function ModalRegistrarEquipo({ abierto, cerrar, alRegistrar }) {

    const [formulario, setFormulario] = useState({
        usuario_asignado: "",
        id_empleado: "",
        area: "",
        tipo_equipo: "",
        marca: "",
        modelo: "",
        serial: "",
        codigo_inventario: "",
    });

    if (!abierto) return null;

    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });

    };

    const guardarEquipo = async (e) => {

        e.preventDefault();

        try {

            const respuesta = await registrarEquipo(formulario);

            alert("Equipo registrado correctamente");

            console.log(respuesta);

            alRegistrar?.();

            cerrar();

        } catch (error) {

            console.log(error);

            alert("Error al registrar el equipo");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-3xl font-bold text-green-700">
                        Registrar Equipo
                    </h2>

                    <button
                        onClick={cerrar}
                        className="text-3xl hover:text-red-600"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={guardarEquipo}
                    className="space-y-6"
                >

                    <h3 className="text-xl font-semibold">
                        Responsable
                    </h3>

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            name="usuario_asignado"
                            placeholder="Usuario Asignado"
                            className="border p-3 rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="id_empleado"
                            type="number"
                            placeholder="ID Empleado"
                            className="border p-3 rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="area"
                            className="border p-3 rounded-lg col-span-2"
                            onChange={handleChange}
                            required
                        >

                            <option value="">Seleccione un Área</option>

                            <option>Sistemas</option>

                            <option>Administración</option>

                            <option>Coordinación</option>

                            <option>Almacén</option>

                        </select>

                    </div>

                    <h3 className="text-xl font-semibold">
                        Equipo
                    </h3>

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            name="tipo_equipo"
                            className="border p-3 rounded-lg"
                            onChange={handleChange}
                            required
                        >

                            <option value="">Tipo de Equipo</option>
                            <option>Portátil</option>
                            <option>Desktop</option>
                            <option>Monitor</option>
                            <option>Impresora</option>
                            <option>Tablet</option>

                        </select>

                        <input
                            name="marca"
                            placeholder="Marca"
                            className="border p-3 rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="modelo"
                            placeholder="Modelo"
                            className="border p-3 rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="serial"
                            placeholder="Número de Serie"
                            className="border p-3 rounded-lg"
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="codigo_inventario"
                            placeholder="Código Inventario"
                            className="border p-3 rounded-lg col-span-2"
                            onChange={handleChange}
                        />

                    </div>

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
                            className="px-6 py-3 rounded-lg bg-gray-300"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-green-600 text-white"
                        >
                            Registrar Equipo
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ModalRegistrarEquipo;