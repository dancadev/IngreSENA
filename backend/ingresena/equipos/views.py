from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Equipo
from .serializers import EquipoSerializer


@api_view(["GET", "POST"])
def equipos(request):

    if request.method == "GET":

        lista = Equipo.objects.all().order_by("-id")

        serializer = EquipoSerializer(lista, many=True)

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