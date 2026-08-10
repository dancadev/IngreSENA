from django.db import models


class Equipo(models.Model):

    AREA_CHOICES = [
        ("Sistemas", "Sistemas"),
        ("Administración", "Administración"),
        ("Coordinación", "Coordinación"),
        ("Almacén", "Almacén"),
    ]

    TIPO_EQUIPO = [
        ("Portátil", "Portátil"),
        ("Desktop", "Desktop"),
        ("Monitor", "Monitor"),
        ("Impresora", "Impresora"),
        ("Tablet", "Tablet"),
    ]

    usuario_asignado = models.CharField(max_length=100)
    id_empleado = models.IntegerField()

    area = models.CharField(max_length=50, choices=AREA_CHOICES)

    tipo_equipo = models.CharField(max_length=50, choices=TIPO_EQUIPO)

    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)

    serial = models.CharField(max_length=100, unique=True)

    codigo_inventario = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    codigo_barras = models.CharField(
        max_length=30,
        unique=True,
        blank=True
    )

    fecha_registro = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

        if not self.codigo_barras:
            self.codigo_barras = f"SENA-{self.id:06d}"

            super().save(update_fields=["codigo_barras"])

    def __str__(self):
        return f"{self.marca} {self.modelo}"