const URL = "http://127.0.0.1:8000/api/visitantes/";

export async function listarVisitantes() {

    const respuesta = await fetch(URL);

    return await respuesta.json();
}

export async function registrarVisitante(datos) {

    const respuesta = await fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(datos),

    });

    return await respuesta.json();
}

export async function actualizarVisitante(id, datos) {

    const respuesta = await fetch(`${URL}${id}/`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(datos),

    });

    return await respuesta.json();
}

export async function eliminarVisitante(id) {

    await fetch(`${URL}${id}/`, {
        method: "DELETE",
    });
}
