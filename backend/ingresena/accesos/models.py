from django.db import models


class Acceso(models.Model):

    TIPO_CHOICES = [
        ("Entrada", "Entrada"),
        ("Salida", "Salida"),
    ]

    TIPO_REGISTRO_CHOICES = [
        ("Empleado", "Empleado"),
        ("Visitante", "Visitante"),
        ("Equipo", "Equipo"),
        ("Desconocido", "Desconocido"),
    ]

    ESTADO_CHOICES = [
        ("Permitido", "Permitido"),
        ("Denegado", "Denegado"),
    ]

    codigo_barras = models.CharField(max_length=30, db_index=True)
    tipo_registro = models.CharField(
        max_length=15,
        choices=TIPO_REGISTRO_CHOICES,
        default="Desconocido",
    )
    tipo = models.CharField(
        max_length=10,
        choices=TIPO_CHOICES,
        default="Entrada",
    )
    estado = models.CharField(
        max_length=15,
        choices=ESTADO_CHOICES,
        default="Permitido",
    )

    empleado = models.ForeignKey(
        "empleados.Empleado",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="accesos",
    )
    visitante = models.ForeignKey(
        "visitantes.Visitante",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="accesos",
    )
    equipo = models.ForeignKey(
        "equipos.Equipo",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="accesos",
    )

    motivo = models.CharField(max_length=200, blank=True)
    fecha_hora = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Acceso"
        verbose_name_plural = "Accesos"
        ordering = ["-fecha_hora"]

    def __str__(self):
        return f"{self.tipo} - {self.codigo_barras}"
