function TarjetaResumen({ titulo, valor, icono, color }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4"
             style={{ borderColor: color }}>

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm font-medium">
                        {titulo}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {valor}
                    </h2>

                </div>

                <div
                    className="w-16 h-16 rounded-full flex justify-center items-center text-white text-3xl"
                    style={{ backgroundColor: color }}
                >
                    {icono}
                </div>

            </div>

        </div>
    );
}

export default TarjetaResumen;