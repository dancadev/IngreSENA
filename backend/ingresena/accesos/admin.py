from django.contrib import admin
from .models import Acceso


@admin.register(Acceso)
class AccesoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "codigo_barras",
        "tipo_registro",
        "tipo",
        "estado",
        "fecha_hora",
    )

    search_fields = ("codigo_barras",)

    list_filter = ("tipo_registro", "tipo", "estado")
