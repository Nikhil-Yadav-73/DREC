from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Note
from .serializers import NoteSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
    
        # Add custom claims
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def routes(request):
    routes = [
        '/api/token/refresh',
        '/api/token/',
    ]

    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getnotes(request):
    notes = Note.objects.filter(user=request.user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)