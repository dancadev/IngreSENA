from datetime import timedelta

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils import timezone

from empleados.models import Empleado
from equipos.models import Equipo
from visitantes.models import Visitante
from accesos.models import Acceso


class Command(BaseCommand):
    help = "Crea datos de ejemplo para todos los módulos del sistema."

    def handle(self, *args, **options):

        # 1. Usuario administrador
        admin, creado = User.objects.get_or_create(
            username="admin",
            defaults={"is_staff": True, "is_superuser": True},
        )
        admin.set_password("admin123")
        admin.first_name = "Administrador"
        admin.last_name = "SENA"
        admin.is_staff = True
        admin.is_superuser = True
        admin.save()

        self.stdout.write(self.style.SUCCESS(f"[OK] Usuario admin {'creado' if creado else 'ya existia'}"))

        # 2. Empleados
        empleados_datos = [
            ("Ana María Torres", "CC", "1023415087", "Instructora", "Sistemas", "Activo", "ana.torres@sena.edu.co", "3102345678"),
            ("Luis Fernando Ramírez", "CC", "79765412", "Coordinador", "Coordinación", "Activo", "luis.ramirez@sena.edu.co", "3204561234"),
            ("Carolina Restrepo", "CC", "53004521", "Instructora", "Administración", "Activo", "carolina.restrepo@sena.edu.co", "3007896541"),
            ("Jorge Andrés Mejía", "CC", "98564123", "Auxiliar de Almacén", "Almacén", "Activo", "jorge.mejia@sena.edu.co", "3012348765"),
            ("Paola Andrea Cifuentes", "CE", "741258963", "Instructora", "Sistemas", "Activo", "paola.cifuentes@sena.edu.co", "3159871234"),
            ("Ricardo Antonio Vega", "CC", "1123698745", "Administrativo", "Administración", "Inactivo", "ricardo.vega@sena.edu.co", "3114567890"),
            ("María Fernanda Osorio", "CC", "45678912", "Instructora", "Sistemas", "Activo", "maria.osorio@sena.edu.co", "3126549870"),
            ("Óscar Iván Gutiérrez", "CC", "80451236", "Técnico", "Sistemas", "Activo", "oscar.gutierrez@sena.edu.co", "3134567891"),
        ]

        for datos in empleados_datos:
            nombre, tipo_doc, doc, cargo, area, estado, correo, telefono = datos
            empleado, creado = Empleado.objects.get_or_create(
                documento=doc,
                defaults={
                    "nombre": nombre,
                    "tipo_documento": tipo_doc,
                    "cargo": cargo,
                    "area": area,
                    "estado": estado,
                    "correo": correo,
                    "telefono": telefono,
                    "direccion": "Centro de formación, SENA",
                },
            )
            if creado:
                empleado.save()
                self.stdout.write(f"  - Empleado {empleado.nombre} ({empleado.codigo_barras})")

        # 3. Equipos (portátiles y tablets principalmente)
        equipos_datos = [
            ("María Fernanda Osorio", 7, "Sistemas", "Portátil", "Lenovo", "ThinkPad T14", "R90X0K123", "INV-1001", "SENA-000001"),
            ("Ana María Torres", 1, "Sistemas", "Portátil", "Dell", "Latitude 7420", "9J4VLP2", "INV-1002", "SENA-000002"),
            ("Carolina Restrepo", 3, "Administración", "Tablet", "Samsung", "Galaxy Tab S7", "SMT810-456", "INV-1003", "SENA-000003"),
            ("Jorge Andrés Mejía", 4, "Almacén", "Tablet", "Apple", "iPad 9", "DMPXK2Z4", "INV-1004", "SENA-000004"),
            ("Luis Fernando Ramírez", 2, "Coordinación", "Portátil", "HP", "ProBook 450 G8", "5CG0480H", "INV-1005", "SENA-000005"),
            ("Paola Andrea Cifuentes", 5, "Sistemas", "Tablet", "Huawei", "MatePad 11", "PAD-HW-908", "INV-1006", "SENA-000006"),
            ("Óscar Iván Gutiérrez", 8, "Sistemas", "Portátil", "ASUS", "VivoBook 15", "ASN15-7412", "INV-1007", "SENA-000007"),
            ("Ricardo Antonio Vega", 6, "Administración", "Desktop", "Dell", "OptiPlex 7080", "5X2QW71", "INV-1008", "SENA-000008"),
            ("Jorge Andrés Mejía", 4, "Almacén", "Portátil", "Lenovo", "IdeaPad 3", "PF3D9Q01", "INV-1009", "SENA-000009"),
            ("Ana María Torres", 1, "Sistemas", "Tablet", "Samsung", "Galaxy Tab A8", "SMA8-8870", "INV-1010", "SENA-000010"),
        ]

        for datos in equipos_datos:
            usuario, id_emp, area, tipo, marca, modelo, serial, cod_inv, cod_barras = datos
            equipo, creado = Equipo.objects.get_or_create(
                serial=serial,
                defaults={
                    "usuario_asignado": usuario,
                    "id_empleado": id_emp,
                    "area": area,
                    "tipo_equipo": tipo,
                    "marca": marca,
                    "modelo": modelo,
                    "codigo_inventario": cod_inv,
                    "codigo_barras": cod_barras,
                },
            )
            if creado:
                self.stdout.write(f"  - Equipo {equipo.marca} {equipo.modelo} ({equipo.codigo_barras})")

        # 4. Visitantes
        visitantes_datos = [
            ("Pedro Salazar", "CC", "98765432", "Tecnofutura S.A.", "Venta de equipos", "Ana María Torres", "Activo"),
            ("Laura Ospina", "CE", "456123789", "Colombia Digital", "Soporte técnico", "Óscar Iván Gutiérrez", "Activo"),
            ("Diego Muñoz", "CC", "321654987", "SenaSoft", "Capacitación", "Paola Andrea Cifuentes", "Activo"),
            ("Valentina Ríos", "CC", "741852963", "Proveedor Almacén", "Entrega de insumos", "Jorge Andrés Mejía", "Activo"),
            ("Felipe Castro", "P", "PRT100025", "Empresa Extranjera", "Auditoría", "Luis Fernando Ramírez", "Activo"),
        ]

        for datos in visitantes_datos:
            nombre, tipo_doc, doc, empresa, motivo, visita, estado = datos
            visitante, creado = Visitante.objects.get_or_create(
                documento=doc,
                defaults={
                    "nombre": nombre,
                    "tipo_documento": tipo_doc,
                    "empresa": empresa,
                    "motivo_visita": motivo,
                    "empleado_a_visitar": visita,
                    "estado": estado,
                },
            )
            if creado:
                visitante.save()
                self.stdout.write(f"  - Visitante {visitante.nombre} ({visitante.codigo_barras})")

        # 5. Historial de accesos de ejemplo
        ahora = timezone.now()
        if Acceso.objects.count() == 0:
            empleados = list(Empleado.objects.all())
            equipos = list(Equipo.objects.all())
            visitantes = list(Visitante.objects.all())

            movimientos = [
                (empleados[0], "Empleado", "Entrada", "Permitido"),
                (empleados[1], "Empleado", "Entrada", "Permitido"),
                (equipos[0], "Equipo", "Entrada", "Permitido"),
                (visitantes[0], "Visitante", "Entrada", "Permitido"),
                (empleados[2], "Empleado", "Entrada", "Permitido"),
                (equipos[1], "Equipo", "Entrada", "Permitido"),
                (empleados[0], "Empleado", "Salida", "Permitido"),
                (visitantes[0], "Visitante", "Salida", "Permitido"),
                (empleados[1], "Empleado", "Salida", "Permitido"),
                (equipos[0], "Equipo", "Salida", "Permitido"),
                ("DESCONOCIDO-999", "Desconocido", "Entrada", "Denegado"),
                (empleados[4], "Empleado", "Entrada", "Permitido"),
                (visitantes[1], "Visitante", "Entrada", "Permitido"),
                (equipos[2], "Equipo", "Entrada", "Permitido"),
                (empleados[4], "Empleado", "Salida", "Permitido"),
            ]

            for i, (objeto, tipo_registro, tipo, estado) in enumerate(movimientos):
                if isinstance(objeto, str):
                    codigo = objeto
                else:
                    codigo = objeto.codigo_barras
                empleado = objeto if tipo_registro == "Empleado" else None
                visitante = objeto if tipo_registro == "Visitante" else None
                equipo = objeto if tipo_registro == "Equipo" else None
                motivo = "Código de barras no registrado en el sistema." if estado == "Denegado" else ""

                Acceso.objects.create(
                    codigo_barras=codigo,
                    tipo_registro=tipo_registro,
                    tipo=tipo,
                    estado=estado,
                    empleado=empleado,
                    visitante=visitante,
                    equipo=equipo,
                    motivo=motivo,
                    fecha_hora=ahora - timedelta(hours=len(movimientos) - i),
                )

            self.stdout.write(self.style.SUCCESS("  - 15 accesos de ejemplo"))

        self.stdout.write(self.style.SUCCESS("\nDatos de ejemplo generados correctamente."))
