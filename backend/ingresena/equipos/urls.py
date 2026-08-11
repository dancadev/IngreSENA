from django.urls import path
from .views import equipos, equipo_detalle, equipo_por_codigo

urlpatterns = [
    path("", equipos, name="equipos"),
    path("codigo/<str:codigo_barras>/", equipo_por_codigo, name="equipo_por_codigo"),
    path("<int:pk>/", equipo_detalle, name="equipo_detalle"),
]
