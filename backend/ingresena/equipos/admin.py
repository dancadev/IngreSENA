from django.contrib import admin
from .models import Equipo

@admin.register(Equipo)
class EquipoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "usuario_asignado",
        "marca",
        "modelo",
        "serial",
        "codigo_barras",
        "fecha_registro",
    )

    search_fields = (
        "usuario_asignado",
        "marca",
        "modelo",
        "serial",
    )

    list_filter = (
        "area",
        "tipo_equipo",
    )