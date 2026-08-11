from django.contrib import admin
from .models import Visitante


@admin.register(Visitante)
class VisitanteAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "nombre",
        "documento",
        "empresa",
        "estado",
        "codigo_barras",
        "hora_entrada",
        "hora_salida",
    )

    search_fields = ("nombre", "documento", "empresa", "empleado_a_visitar")

    list_filter = ("estado",)
