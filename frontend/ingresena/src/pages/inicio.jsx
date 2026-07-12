import Menu from "../components/menu.jsx";
import Perfil from "../components/perfil.jsx";

function Inicio() {

    return (

        <div className="flex min-h-screen bg-slate-100">

            <aside className="w-[20%]">
                < Menu />
            </aside>

            <main className="w-[80%] bg-slate-100 overflow-y-auto p-6">
                < Perfil />
            </main>
            
        </div>

    );
}

export default Inicio;