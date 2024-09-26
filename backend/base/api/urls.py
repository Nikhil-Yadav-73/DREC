from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.routes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('notes', views.getnotes),
]
