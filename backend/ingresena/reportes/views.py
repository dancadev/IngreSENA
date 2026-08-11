from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from accesos.models import Acceso
from equipos.models import Equipo
from empleados.models import Empleado
from visitantes.models import Visitante

from .utils import crear_libro, respuesta_excel


def _parsear_fecha(valor):
    try:
        return datetime.strptime(valor, "%Y-%m-%d").date()
    except (TypeError, ValueError):
        return None


@api_view(["GET"])
def reporte_accesos(request):

    desde = _parsear_fecha(request.query_params.get("desde"))
    hasta = _parsear_fecha(request.query_params.get("hasta"))

    if not desde or not hasta:
        return Response(
            {"error": "Debe indicar las fechas 'desde' y 'hasta' (formato YYYY-MM-DD)."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if desde > hasta:
        return Response(
            {"error": "La fecha 'desde' no puede ser posterior a 'hasta'."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    accesos = Acceso.objects.filter(
        fecha_hora__date__gte=desde,
        fecha_hora__date__lte=hasta,
    ).order_by("fecha_hora")

    filas = []
    for acceso in accesos:
        filas.append([
            acceso.fecha_hora.strftime("%Y-%m-%d %H:%M:%S"),
            acceso.codigo_barras,
            acceso.tipo_registro,
            acceso.tipo,
            acceso.estado,
            acceso.motivo,
        ])

    encabezados = [
        "Fecha y hora",
        "Código de barras",
        "Tipo registro",
        "Tipo movimiento",
        "Estado",
        "Motivo",
    ]

    wb = crear_libro(
        "Reporte de accesos",
        encabezados,
        filas,
        ancho_columnas=[22, 18, 14, 16, 12, 30],
    )

    nombre = f"reporte_accesos_{desde}_a_{hasta}.xlsx"
    return respuesta_excel(wb, nombre)


@api_view(["GET"])
def reporte_equipos(request):

    equipos = Equipo.objects.all().order_by("-id")

    filas = []
    for equipo in equipos:
        filas.append([
            equipo.codigo_barras,
            equipo.usuario_asignado,
            equipo.id_empleado,
            equipo.area,
            equipo.tipo_equipo,
            equipo.marca,
            equipo.modelo,
            equipo.serial,
            equipo.codigo_inventario,
            equipo.fecha_registro.strftime("%Y-%m-%d %H:%M:%S"),
        ])

    encabezados = [
        "Código de barras",
        "Usuario asignado",
        "ID empleado",
        "Área",
        "Tipo de equipo",
        "Marca",
        "Modelo",
        "Serial",
        "Código inventario",
        "Fecha registro",
    ]

    wb = crear_libro(
        "Reporte de equipos",
        encabezados,
        filas,
        ancho_columnas=[18, 22, 12, 16, 14, 14, 14, 18, 16, 22],
    )

    return respuesta_excel(wb, "reporte_equipos.xlsx")


@api_view(["GET"])
def reporte_empleados(request):

    empleados = Empleado.objects.all().order_by("-id")

    filas = []
    for empleado in empleados:
        filas.append([
            empleado.codigo_barras,
            empleado.nombre,
            f"{empleado.tipo_documento} {empleado.documento}",
            empleado.cargo,
            empleado.area,
            empleado.estado,
            empleado.correo,
            empleado.telefono,
            empleado.fecha_registro.strftime("%Y-%m-%d %H:%M:%S"),
        ])

    encabezados = [
        "Código de barras",
        "Nombre",
        "Documento",
        "Cargo",
        "Área",
        "Estado",
        "Correo",
        "Teléfono",
        "Fecha registro",
    ]

    wb = crear_libro(
        "Reporte de empleados",
        encabezados,
        filas,
        ancho_columnas=[18, 26, 18, 18, 16, 12, 26, 14, 22],
    )

    return respuesta_excel(wb, "reporte_empleados.xlsx")


@api_view(["GET"])
def reporte_visitantes(request):

    visitantes = Visitante.objects.all().order_by("-id")

    filas = []
    for visitante in visitantes:
        filas.append([
            visitante.codigo_barras,
            visitante.nombre,
            f"{visitante.tipo_documento} {visitante.documento}",
            visitante.empresa,
            visitante.motivo_visita,
            visitante.empleado_a_visitar,
            visitante.estado,
            visitante.hora_entrada.strftime("%Y-%m-%d %H:%M:%S") if visitante.hora_entrada else "",
            visitante.hora_salida.strftime("%Y-%m-%d %H:%M:%S") if visitante.hora_salida else "",
            visitante.telefono,
            visitante.correo,
        ])

    encabezados = [
        "Código de barras",
        "Nombre",
        "Documento",
        "Empresa",
        "Motivo de visita",
        "Empleado a visitar",
        "Estado",
        "Hora entrada",
        "Hora salida",
        "Teléfono",
        "Correo",
    ]

    wb = crear_libro(
        "Reporte de visitantes",
        encabezados,
        filas,
        ancho_columnas=[18, 26, 18, 20, 24, 20, 12, 20, 20, 14, 24],
    )

    return respuesta_excel(wb, "reporte_visitantes.xlsx")
