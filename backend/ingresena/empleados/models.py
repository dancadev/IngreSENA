from django.db import models


class Empleado(models.Model):

    TIPO_DOCUMENTO = [
        ("CC", "Cédula de ciudadanía"),
        ("CE", "Cédula de extranjería"),
        ("TI", "Tarjeta de identidad"),
        ("P", "Pasaporte"),
    ]

    AREA_CHOICES = [
        ("Sistemas", "Sistemas"),
        ("Administración", "Administración"),
        ("Coordinación", "Coordinación"),
        ("Almacén", "Almacén"),
    ]

    ESTADO_CHOICES = [
        ("Activo", "Activo"),
        ("Inactivo", "Inactivo"),
    ]

    SEXO_CHOICES = [
        ("Masculino", "Masculino"),
        ("Femenino", "Femenino"),
        ("Otro", "Otro"),
    ]

    nombre = models.CharField(max_length=150)
    tipo_documento = models.CharField(max_length=10, choices=TIPO_DOCUMENTO, default="CC")
    documento = models.CharField(max_length=20, unique=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    sexo = models.CharField(max_length=15, choices=SEXO_CHOICES, blank=True)

    cargo = models.CharField(max_length=100)
    area = models.CharField(max_length=50, choices=AREA_CHOICES)
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default="Activo")

    correo = models.EmailField(blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.CharField(max_length=200, blank=True)

    codigo_barras = models.CharField(
        max_length=30,
        unique=True,
        blank=True,
    )

    fecha_registro = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if not self.codigo_barras:
            self.codigo_barras = f"EMP-{self.id:06d}"
            super().save(update_fields=["codigo_barras"])

    def __str__(self):
        return self.nombre
