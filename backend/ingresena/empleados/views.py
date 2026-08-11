from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Empleado
from .serializers import EmpleadoSerializer


@api_view(["GET", "POST"])
def empleados(request):

    if request.method == "GET":

        queryset = Empleado.objects.all().order_by("-id")

        buscar = request.query_params.get("buscar")
        area = request.query_params.get("area")
        estado = request.query_params.get("estado")

        if buscar:
            queryset = queryset.filter(
                nombre__icontains=buscar
            ) | queryset.filter(
                documento__icontains=buscar
            ) | queryset.filter(
                cargo__icontains=buscar
            )
        if area:
            queryset = queryset.filter(area=area)
        if estado:
            queryset = queryset.filter(estado=estado)

        serializer = EmpleadoSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = EmpleadoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def empleado_detalle(request, pk):

    try:
        empleado = Empleado.objects.get(pk=pk)
    except Empleado.DoesNotExist:
        return Response(
            {"error": "Empleado no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        serializer = EmpleadoSerializer(empleado)
        return Response(serializer.data)

    if request.method in ("PUT", "PATCH"):
        serializer = EmpleadoSerializer(
            empleado,
            data=request.data,
            partial=request.method == "PATCH",
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        empleado.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
