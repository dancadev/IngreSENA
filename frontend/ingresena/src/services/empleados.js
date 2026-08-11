const URL = "http://127.0.0.1:8000/api/empleados/";

export async function listarEmpleados(filtros = {}) {

    const params = new URLSearchParams();

    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor) params.append(clave, valor);
    });

    const url = params.toString() ? `${URL}?${params}` : URL;

    const respuesta = await fetch(url);

    return await respuesta.json();
}

export async function registrarEmpleado(datos) {

    const respuesta = await fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(datos),

    });

    return await respuesta.json();
}
