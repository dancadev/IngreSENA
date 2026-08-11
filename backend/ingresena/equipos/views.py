from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Equipo
from .serializers import EquipoSerializer


@api_view(["GET", "POST"])
def equipos(request):

    if request.method == "GET":

        queryset = Equipo.objects.all().order_by("-id")

        buscar = request.query_params.get("buscar")
        tipo_equipo = request.query_params.get("tipo_equipo")
        area = request.query_params.get("area")

        if buscar:
            queryset = queryset.filter(
                usuario_asignado__icontains=buscar
            ) | queryset.filter(
                serial__icontains=buscar
            ) | queryset.filter(
                codigo_barras__icontains=buscar
            )
        if tipo_equipo:
            queryset = queryset.filter(tipo_equipo=tipo_equipo)
        if area:
            queryset = queryset.filter(area=area)

        serializer = EquipoSerializer(queryset, many=True)

        return Response(serializer.data)

    if request.method == "POST":

        serializer = EquipoSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def equipo_detalle(request, pk):

    try:
        equipo = Equipo.objects.get(pk=pk)
    except Equipo.DoesNotExist:
        return Response(
            {"error": "Equipo no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        serializer = EquipoSerializer(equipo)
        return Response(serializer.data)

    if request.method in ("PUT", "PATCH"):
        serializer = EquipoSerializer(
            equipo,
            data=request.data,
            partial=request.method == "PATCH",
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        equipo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def equipo_por_codigo(request, codigo_barras):

    equipo = (
        Equipo.objects.filter(codigo_barras=codigo_barras).first()
        or Equipo.objects.filter(serial=codigo_barras).first()
    )

    if equipo is None:
        return Response(
            {"error": "Equipo no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    return Response(EquipoSerializer(equipo).data)
