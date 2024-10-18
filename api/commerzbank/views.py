from rest_framework import viewsets
from .models import UserLayer



class UserLayerView(viewsets.ModelViewSet):
    queryset = UserLayer.objects.all()
    serializer_class = UserLayerSerializer
