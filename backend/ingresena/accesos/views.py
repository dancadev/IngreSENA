from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Acceso
from .serializers import AccesoSerializer, RegistrarAccesoSerializer

from empleados.models import Empleado
from visitantes.models import Visitante
from equipos.models import Equipo


def _determinar_tipo(codigo):
    """Alterna automáticamente entre Entrada y Salida según el último acceso."""
    ultimo = (
        Acceso.objects.filter(codigo_barras=codigo)
        .exclude(estado="Denegado")
        .order_by("-id")
        .first()
    )

    if ultimo and ultimo.tipo == "Entrada":
        return "Salida"

    return "Entrada"


@api_view(["POST"])
def registrar_acceso(request):

    serializer = RegistrarAccesoSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    codigo = serializer.validated_data["codigo_barras"].strip()

    empleado = Empleado.objects.filter(codigo_barras=codigo).first()
    visitante = Visitante.objects.filter(codigo_barras=codigo).first()
    equipo = Equipo.objects.filter(codigo_barras=codigo).first()

    # Buscar también por serial para los equipos
    if equipo is None:
        equipo = Equipo.objects.filter(serial=codigo).first()

    if empleado:
        tipo_registro = "Empleado"
        estado = "Permitido"
        motivo = ""
    elif visitante:
        tipo_registro = "Visitante"
        estado = "Permitido"
        motivo = ""
    elif equipo:
        tipo_registro = "Equipo"
        estado = "Permitido"
        motivo = ""
    else:
        tipo_registro = "Desconocido"
        estado = "Denegado"
        motivo = "Código de barras no registrado en el sistema."

    tipo = _determinar_tipo(codigo)

    acceso = Acceso.objects.create(
        codigo_barras=codigo,
        tipo_registro=tipo_registro,
        tipo=tipo,
        estado=estado,
        empleado=empleado,
        visitante=visitante,
        equipo=equipo,
        motivo=motivo,
    )

    # Actualizar estado del visitante según el movimiento
    if visitante:
        if tipo == "Entrada":
            visitante.estado = "Dentro"
            visitante.hora_entrada = timezone.now()
        else:
            visitante.estado = "Fuera"
            visitante.hora_salida = timezone.now()
        visitante.save(update_fields=["estado", "hora_entrada", "hora_salida"])

    return Response(AccesoSerializer(acceso).data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def accesos(request):

    queryset = Acceso.objects.all()

    # Filtros opcionales
    tipo = request.query_params.get("tipo")
    estado = request.query_params.get("estado")
    tipo_registro = request.query_params.get("tipo_registro")
    fecha = request.query_params.get("fecha")
    buscar = request.query_params.get("buscar")

    if tipo:
        queryset = queryset.filter(tipo=tipo)
    if estado:
        queryset = queryset.filter(estado=estado)
    if tipo_registro:
        queryset = queryset.filter(tipo_registro=tipo_registro)
    if fecha:
        queryset = queryset.filter(fecha_hora__date=fecha)
    if buscar:
        queryset = queryset.filter(codigo_barras__icontains=buscar)

    queryset = queryset[:100]

    serializer = AccesoSerializer(queryset, many=True)
    return Response(serializer.data)
