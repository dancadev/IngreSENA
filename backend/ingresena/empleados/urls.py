from django.urls import path
from .views import empleados, empleado_detalle

urlpatterns = [
    path("", empleados, name="empleados"),
    path("<int:pk>/", empleado_detalle, name="empleado_detalle"),
]
