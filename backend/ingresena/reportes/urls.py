from django.urls import path
from .views import (
    reporte_accesos,
    reporte_equipos,
    reporte_empleados,
    reporte_visitantes,
)

urlpatterns = [
    path("accesos/", reporte_accesos, name="reporte_accesos"),
    path("equipos/", reporte_equipos, name="reporte_equipos"),
    path("empleados/", reporte_empleados, name="reporte_empleados"),
    path("visitantes/", reporte_visitantes, name="reporte_visitantes"),
]
