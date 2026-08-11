from rest_framework import serializers
from .models import Visitante


class VisitanteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Visitante
        fields = "__all__"
        read_only_fields = (
            "codigo_barras",
            "fecha_registro",
            "hora_entrada",
            "hora_salida",
        )
