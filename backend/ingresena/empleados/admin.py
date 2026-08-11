from django.contrib import admin
from .models import Empleado


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "nombre",
        "documento",
        "cargo",
        "area",
        "estado",
        "codigo_barras",
    )

    search_fields = ("nombre", "documento", "cargo")

    list_filter = ("area", "estado")
