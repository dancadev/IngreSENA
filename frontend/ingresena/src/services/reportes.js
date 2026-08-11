const URL = "http://127.0.0.1:8000/api/reportes/";

async function descargar(uri, nombreArchivo) {

    const respuesta = await fetch(URL + uri);

    if (!respuesta.ok) {
        throw new Error("No fue posible generar el reporte.");
    }

    const blob = await respuesta.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    link.click();

    URL.revokeObjectURL(link.href);
}

export function descargarReporteAccesos(desde, hasta) {
    return descargar(
        `accesos/?desde=${desde}&hasta=${hasta}`,
        `reporte_accesos_${desde}_a_${hasta}.xlsx`
    );
}

export function descargarReporteEquipos() {
    return descargar("equipos/", "reporte_equipos.xlsx");
}

export function descargarReporteEmpleados() {
    return descargar("empleados/", "reporte_empleados.xlsx");
}

export function descargarReporteVisitantes() {
    return descargar("visitantes/", "reporte_visitantes.xlsx");
}
