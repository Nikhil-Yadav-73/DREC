from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include("base.api.urls")),
    path('admin/', admin.site.urls),
]
