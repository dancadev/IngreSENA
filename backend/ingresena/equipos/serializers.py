from rest_framework import serializers
from .models import Equipo


class EquipoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equipo

        fields = "__all__"

        read_only_fields = (
            "codigo_barras",
            "fecha_registro",
        )