from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Note, Item, Cart, CartItem, Category, UserProfile, User
from .serializers import NoteSerializer, ItemSerializer, CategorySerializer, CartItemSerializer, UserSerializer, UserProfileSerializer
from rest_framework.exceptions import NotFound
from rest_framework import generics, status
from django.db.models import Q
from rest_framework.permissions import AllowAny

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
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

class ItemListView(generics.ListAPIView):
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
            item = Item.objects.get(id=id)
            category = item.category
            recommended_items = Item.objects.filter(category=category).exclude(id=id)[:4]
            serializer = self.get_serializer(recommended_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Item.DoesNotExist:
            raise NotFound(detail="Item not found", code=status.HTTP_404_NOT_FOUND)
        
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'

class CategoryItemListView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'id'

    def get(self, request, name, *args, **Kwargs):
        try:
            category = Category.objects.get(name=name)
            items = Item.objects.filter(category=category)
            serializer = self.get_serializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            raise NotFound(detail="Item not found", code=status.HTTP_404_NOT_FOUND)
 
class CartView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get(self, request, id, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)
            serializer = self.get_serializer(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Cart.DoesNotExist:
            return Response({"detail": "Cart is Empty"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'id'

    def get(self, request, id, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            userprofile, created = UserProfile.objects.get_or_create(user=user)
            serializer = self.get_serializer(userprofile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            raise NotFound(detail="User not found", code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, id, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            userprofile, created = UserProfile.objects.get_or_create(user=user)
            serializer = self.get_serializer(userprofile, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            raise NotFound(detail="User not found", code=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Search(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(name__icontains=query) | Q(description__icontains=query))
        return queryset
    
class AddToCartView(generics.RetrieveUpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'id'

    def post(self, request, id, pk, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            cart, created = Cart.objects.get_or_create(user=user)
            item = Item.objects.get(id=pk)
            try: 
                cart_item = CartItem.objects.get(item=item, cart=cart)
                if cart_item is not None:
                    cart_item.quantity = cart_item.quantity + 1
            except CartItem.DoesNotExist:
                    cart_item = CartItem.objects.create(
                    cart=cart,
                    item=item,
                    quantity = 1
                )
            cart_item.save()

            return Response({'message': 'Item added to cart successfully!'}, status=status.HTTP_201_CREATED)

        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteCartItem(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer
    lookup_field = 'pk'

    def post(self, request, id, pk, *args, **kwargs):
        try:
            user = User.objects.get(id=id)
            cart = Cart.objects.get(user=user)
            item = Item.objects.get(id=pk)
            cart_item = CartItem.objects.get(item=item, cart=cart)
            cart_item.delete()
            cart.save()

            cart_items = CartItem.objects.filter(cart=cart)
            serializer = self.get_serializer(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Cart.DoesNotExist:
            return Response({"detail": "Cart is Empty"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class Signup(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateCartItemQuantity(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer 
    lookup_field = 'id'

    def post(self, request, id, act, user_id, *args, **kwargs):
        try:
            num = int(act)
            user = User.objects.get(id=user_id)
            item = Item.objects.get(id=id)
            cart = Cart.objects.get(user=user)
            cart_item = CartItem.objects.get(item=item, cart=cart)
            cart_item.quantity = cart_item.quantity + num
            if item.quantity < cart_item.quantity:
                cart_item.quantity = item.quantity
                cart_item.save()
            if cart_item.quantity <= 0:
                cart_item.delete()
            else: cart_item.save()

            cart_items = CartItem.objects.filter(cart=cart)
            serializer = self.get_serializer(cart_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response({'error': 'Cart Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found (out of stock)'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)