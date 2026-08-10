const URL = "http://127.0.0.1:8000/api/equipos/";

export async function registrarEquipo(datos) {

    const respuesta = await fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(datos),

    });

    return await respuesta.json();
}