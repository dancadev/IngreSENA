from django.urls import path
from .views import visitantes, visitante_detalle

urlpatterns = [
    path("", visitantes, name="visitantes"),
    path("<int:pk>/", visitante_detalle, name="visitante_detalle"),
]
