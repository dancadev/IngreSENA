import { Link } from "react-router-dom";

function Menu({ cambiarVista }) {
    return (
        <aside className="w-[20%] h-screen overflow-y-auto bg-green-700  text-white fixed left-0 top-0">

            {/* Logo */}
            <div className="p-8">
                <h1 className="text-3xl font-bold">
                    IngreSENA
                </h1>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-3 rounded-xl px-6">

                <button onClick={() => cambiarVista("perfil")}
                    className="bg-white text-green-700 rounded-full px-5 py-3 font-medium text-left">
                    Registro Usuario
                </button>


                <button onClick={() => cambiarVista("historial")}
                    className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Historial
                </button>

                <button
                    onClick={() => cambiarVista("empleados")}
                    className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Empleados
                </button>

                <button className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Equipos
                </button>

                <button className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Control de Accesos
                </button>

                <button className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Visitantes
                </button>

                <button className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Reportes
                </button>

                <button className="px-5 py-3 hover:bg-green-800 rounded-xl transition text-left">
                    Configuración
                </button>

            </nav>

            {/* Espacio para imagen */}
            <div className="mt-auto flex justify-center items-center p-8">
                <div className="w-40 h-40 border border-dashed border-white/30 rounded-xl flex items-center justify-center text-center text-sm">
                    Imagen
                </div>
            </div>

            {/* Cerrar sesión */}
            <div className="p-6">
                <Link to="/">
                    <button className="w-full bg-red-500 hover:bg-red-600 rounded-xl py-3 transition">
                        Cerrar Sesión
                    </button>
                </Link>
            </div>

        </aside>
    );
}

export default Menu;