from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from chatai import urls as chatai_urls
from django.conf.urls.static import static
from api import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('commerzbank.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# WebSocket URL patterns
# websocket_urlpatterns = [
#     re_path(r'ws/chat/', include(chatai_urls)),
# ]