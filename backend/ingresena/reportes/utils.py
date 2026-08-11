from django.http import HttpResponse
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter


VERDE = "39A900"


def crear_libro(nombre_hoja, encabezados, filas, ancho_columnas=None):
    """Crea un libro de Excel con formato y devuelve la respuesta HTTP."""

    wb = Workbook()
    ws = wb.active
    ws.title = nombre_hoja

    # Estilo de encabezados
    fuente_encabezado = Font(bold=True, color="FFFFFF", size=11)
    relleno_encabezado = PatternFill(
        start_color=VERDE,
        end_color=VERDE,
        fill_type="solid",
    )
    alineacion_encabezado = Alignment(horizontal="center", vertical="center")

    ws.append(encabezados)

    for celda in ws[1]:
        celda.font = fuente_encabezado
        celda.fill = relleno_encabezado
        celda.alignment = alineacion_encabezado

    # Datos
    for fila in filas:
        ws.append(fila)

    # Ancho de columnas
    if ancho_columnas:
        for i, ancho in enumerate(ancho_columnas, start=1):
            ws.column_dimensions[get_column_letter(i)].width = ancho
    else:
        for i in range(1, len(encabezados) + 1):
            ws.column_dimensions[get_column_letter(i)].width = 20

    ws.freeze_panes = "A2"

    return wb


def respuesta_excel(wb, nombre_archivo):
    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
    response["Content-Disposition"] = f'attachment; filename="{nombre_archivo}"'
    wb.save(response)
    return response
