from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.routes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('items/', views.ItemListView.as_view(), name='item_list_view'),
    path('items/<int:id>', views.ItemDetailView.as_view(), name='items_detail'),
    path('items/recommended/<int:id>', views.RecommendedItems.as_view(), name='recommended_items'),
    path('categories/', views.CategoryListView.as_view(), name='category_list_view'),
    path('categories/<str:name>', views.CategoryItemListView.as_view(), name='category_items_view'),
    path('cart/<int:id>', views.CartView.as_view(), name='cart_view'), 
    path('userprofile/<int:id>', views.UserProfileView.as_view(), name='user_profile'),
    path('notes', views.getnotes),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
