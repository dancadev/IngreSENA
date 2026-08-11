from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("usuarios.urls")),
    path("api/equipos/", include("equipos.urls")),
    path("api/empleados/", include("empleados.urls")),
    path("api/accesos/", include("accesos.urls")),
    path("api/visitantes/", include("visitantes.urls")),
    path("api/reportes/", include("reportes.urls")),
]