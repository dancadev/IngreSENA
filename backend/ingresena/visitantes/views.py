from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Visitante
from .serializers import VisitanteSerializer


@api_view(["GET", "POST"])
def visitantes(request):

    if request.method == "GET":
        lista = Visitante.objects.all().order_by("-id")
        serializer = VisitanteSerializer(lista, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = VisitanteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def visitante_detalle(request, pk):

    try:
        visitante = Visitante.objects.get(pk=pk)
    except Visitante.DoesNotExist:
        return Response(
            {"error": "Visitante no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        serializer = VisitanteSerializer(visitante)
        return Response(serializer.data)

    if request.method in ("PUT", "PATCH"):
        serializer = VisitanteSerializer(
            visitante,
            data=request.data,
            partial=request.method == "PATCH",
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        visitante.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
