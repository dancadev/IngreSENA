from django.urls import path
from .views import equipos

urlpatterns = [
    path("", equipos, name="equipos"),
]