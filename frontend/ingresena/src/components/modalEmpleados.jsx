import { useState } from "react";
import { registrarEmpleado } from "../services/empleados.js";

function ModalEmpleado({ abierto, cerrar, alRegistrar }) {

    const [empleado, setEmpleado] = useState({

        nombre: "",
        tipoDocumento: "CC",
        documento: "",
        fechaNacimiento: "",
        sexo: "",

        cargo: "",
        area: "",
        estado: "Activo",

        correo: "",
        telefono: "",
        direccion: "",

        foto: null

    });

    if (!abierto) return null;

    const handleChange = (e) => {

        setEmpleado({

            ...empleado,
            [e.target.name]: e.target.value

        });

    };

    const handleFoto = (e) => {

        setEmpleado({

            ...empleado,
            foto: e.target.files[0]

        });

    };

    const guardarEmpleado = async (e) => {

        e.preventDefault();

        const datos = {

            nombre: empleado.nombre,
            tipo_documento: empleado.tipoDocumento,
            documento: empleado.documento,
            fecha_nacimiento: empleado.fechaNacimiento || null,
            sexo: empleado.sexo,
            cargo: empleado.cargo,
            area: empleado.area,
            estado: empleado.estado,
            correo: empleado.correo,
            telefono: empleado.telefono,
            direccion: empleado.direccion,

        };

        try {

            const respuesta = await registrarEmpleado(datos);

            if (respuesta.id) {

                alert("Empleado registrado correctamente");

                alRegistrar?.();

                cerrar();

            } else {

                alert("Error al registrar el empleado");

            }

        } catch (error) {

            console.error(error);

            alert("Error al registrar el empleado");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-5 overflow-y-auto">

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

                <div className="p-8">

                    <div className="flex justify-between items-center mb-8">

                        <h2 className="text-3xl font-bold text-[#39A900]">

                            Registrar Empleado

                        </h2>

                        <button

                            onClick={cerrar}

                            className="text-3xl hover:text-red-500"

                        >

                            ×

                        </button>

                    </div>

                    <form
                        onSubmit={guardarEmpleado}
                        className="space-y-8"
                    >

                        {/* FOTO */}

                        <div className="flex flex-col items-center">

                            <div className="w-36 h-36 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">

                                {empleado.foto ?

                                    <img

                                        src={URL.createObjectURL(empleado.foto)}

                                        alt="foto"

                                        className="w-full h-full object-cover"

                                    />
                                    :

                                    <span className="text-gray-500">

                                        Sin Foto

                                    </span>

                                }

                            </div>

                            <input

                                type="file"

                                className="mt-4"

                                accept="image/*"

                                onChange={handleFoto}

                            />

                        </div>

                        {/* DATOS PERSONALES */}

                        <div>

                            <h3 className="text-xl font-bold text-[#39A900] mb-4">

                                Información Personal

                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <input

                                    name="nombre"

                                    placeholder="Nombre Completo"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                    required

                                />

                                <select

                                    name="tipoDocumento"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                >

                                    <option value="CC">CC</option>

                                    <option value="CE">CE</option>

                                    <option value="TI">TI</option>

                                    <option value="P">P</option>

                                </select>

                                <input

                                    name="documento"

                                    placeholder="Número Documento"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                    required

                                />

                                <input

                                    type="date"

                                    name="fechaNacimiento"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                />

                                <select

                                    name="sexo"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Sexo

                                    </option>

                                    <option>Masculino</option>

                                    <option>Femenino</option>

                                    <option>Otro</option>

                                </select>

                            </div>

                        </div>

                        {/* INFORMACIÓN LABORAL */}

                        <div>

                            <h3 className="text-xl font-bold text-[#39A900] mb-4">

                                Información Laboral

                            </h3>

                            <div className="grid md:grid-cols-3 gap-4">

                                <input

                                    name="cargo"

                                    placeholder="Cargo"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                    required

                                />

                                <select

                                    name="area"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                    required
                                >

                                    <option value="">

                                        Área

                                    </option>

                                    <option>Sistemas</option>

                                    <option>Administración</option>

                                    <option>Coordinación</option>

                                    <option>Almacén</option>

                                </select>

                                <select

                                    name="estado"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                >

                                    <option>Activo</option>

                                    <option>Inactivo</option>

                                </select>

                            </div>

                        </div>

                        {/* CONTACTO */}

                        <div>

                            <h3 className="text-xl font-bold text-[#39A900] mb-4">

                                Información de Contacto

                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <input

                                    name="correo"

                                    placeholder="Correo"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                />

                                <input

                                    name="telefono"

                                    placeholder="Teléfono"

                                    className="border rounded-lg p-3"

                                    onChange={handleChange}

                                />

                                <input

                                    name="direccion"

                                    placeholder="Dirección"

                                    className="border rounded-lg p-3 md:col-span-2"

                                    onChange={handleChange}

                                />

                            </div>

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

                                Registrar Empleado

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default ModalEmpleado;