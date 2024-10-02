from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Note, Item, Cart, CartItem, Category
from .serializers import NoteSerializer, ItemSerializer, CategorySerializer
from rest_framework.exceptions import NotFound
from rest_framework import generics, status

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

# Core

class ItemListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_serializer_context(self):
        return {'request': self.request}

# @permission_classes([IsAuthenticated])
class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'id'

    def update(self, request, id, *args, **kwargs):
        try:
            item = Item.objects.get(id=id)
            serializer = ItemSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Item updated successfully!", "item": serializer.data}, status=status.HTTP_205_RESET_CONTENT)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Item.DoesNotExist:
            raise NotFound(detail="Item not found", code=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        try:
            item = Item.objects.get(id=id)
            item.delete()
            return Response({"message": "Item deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Item.DoesNotExist:
            raise NotFound(detail="Item not found", code=status.HTTP_404_NOT_FOUND)
        
class RecommendedItems(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'id'

    def get(self, request, id, *args, **kwargs):
        try:
            # Fetch the item based on the provided id
            item = Item.objects.get(id=id)
            category = item.category
            
            # Get the recommended items from the same category
            recommended_items = Item.objects.filter(category=category).exclude(id=id)[:4]
            serializer = self.get_serializer(recommended_items, many=True)
            
            # Return the serialized data in the response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Item.DoesNotExist:
            raise NotFound(detail="Item not found", code=status.HTTP_404_NOT_FOUND)