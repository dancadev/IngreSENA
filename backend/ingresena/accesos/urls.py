from django.urls import path
from .views import registrar_acceso, accesos

urlpatterns = [
    path("registrar/", registrar_acceso, name="registrar_acceso"),
    path("", accesos, name="accesos"),
]
