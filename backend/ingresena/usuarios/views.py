from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def login(request):
    usuario = request.data.get("usuario")
    password = request.data.get("password")

    # Validar que los campos no estén vacíos
    if not usuario or not password:
        return Response(
            {"error": "Debe ingresar el usuario y la contraseña."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Autenticar usuario
    user = authenticate(username=usuario, password=password)

    if user is None:
        return Response(
            {"error": "Usuario o contraseña incorrectos."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Generar token JWT
    refresh = RefreshToken.for_user(user)

    return Response({
        "mensaje": "Inicio de sesión exitoso",
        "usuario": user.username,
        "nombre": user.get_full_name(),
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }, status=status.HTTP_200_OK)