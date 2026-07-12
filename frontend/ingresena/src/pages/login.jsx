import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoSena from "../assets/logoSena.png";
import imgAlusiva from "../assets/imgAlusiva.webp";

function Login() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const iniciarSesion = async () => {
        setMensaje("");

        if (usuario === "" || password === "") {
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        setCargando(true);

        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario,
                    password,
                }),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem("token", datos.access);
                localStorage.setItem("refresh", datos.refresh);

                navigate("/inicio");
            } else {
                setMensaje(datos.error || "Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            console.error(error);
            setMensaje("No fue posible conectar con el servidor.");
        }

        setCargando(false);
    };

    return (
        <div className="min-h-screen bg-slate-200 flex items-center justify-center p-5">

            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

                {/* Lado izquierdo */}
                <div className="w-1/2 bg-slate-50 flex flex-col">

                    <div className="p-8">
                        <img
                            src={logoSena}
                            alt="Logo SENA"
                            className="w-44"
                        />
                    </div>

                    <div className="flex-1 flex items-center justify-center p-8">
                        <img
                            src={imgAlusiva}
                            alt="Imagen alusiva"
                            className="w-4/5 max-w-md"
                        />
                    </div>

                </div>

                {/* Lado derecho */}

                <div className="w-1/2 flex items-center justify-center">

                    <main className="w-[70%] flex flex-col gap-4">

                        <h1 className="text-4xl font-bold text-gray-800">
                            IngreSENA
                        </h1>

                        <p className="text-gray-500">
                            Sistema de control de ingreso
                        </p>

                        <input
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        />

                        {mensaje && (
                            <div className="text-red-600 text-sm">
                                {mensaje}
                            </div>
                        )}

                        <a
                            href="#"
                            className="text-green-600 text-sm hover:underline"
                        >
                            Registrar Invitado
                        </a>

                        <button
                            onClick={iniciarSesion}
                            disabled={cargando}
                            className="w-full h-12 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:bg-gray-400"
                        >
                            {cargando ? "Ingresando..." : "Ingresar"}
                        </button>

                    </main>

                </div>

            </div>

        </div>
    );
}

export default Login;