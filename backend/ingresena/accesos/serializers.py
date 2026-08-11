from rest_framework import serializers
from .models import Acceso

from empleados.serializers import EmpleadoSerializer
from visitantes.serializers import VisitanteSerializer
from equipos.serializers import EquipoSerializer


class AccesoSerializer(serializers.ModelSerializer):

    empleado_detalle = EmpleadoSerializer(source="empleado", read_only=True)
    visitante_detalle = VisitanteSerializer(source="visitante", read_only=True)
    equipo_detalle = EquipoSerializer(source="equipo", read_only=True)

    class Meta:
        model = Acceso
        fields = "__all__"
        read_only_fields = (
            "tipo_registro",
            "tipo",
            "estado",
            "empleado",
            "visitante",
            "equipo",
            "motivo",
            "fecha_hora",
        )


class RegistrarAccesoSerializer(serializers.Serializer):
    codigo_barras = serializers.CharField(max_length=30)
