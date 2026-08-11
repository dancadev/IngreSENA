const URL = "http://127.0.0.1:8000/api/accesos/";

export async function listarAccesos(filtros = {}) {

    const params = new URLSearchParams();

    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor) params.append(clave, valor);
    });

    const url = params.toString() ? `${URL}?${params}` : URL;

    const respuesta = await fetch(url);

    return await respuesta.json();
}

export async function registrarAcceso(codigoBarras) {

    const respuesta = await fetch(`${URL}registrar/`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({ codigo_barras: codigoBarras }),

    });

    return await respuesta.json();
}
