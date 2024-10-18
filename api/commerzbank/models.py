from django.contrib.auth.models import User
from django.db import models

class UserLayer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer_1 = models.CharField(max_length=100)
    answer_2 = models.CharField(max_length=100)
    answer_3 = models.CharField(max_length=100)
    answer_4 = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    layout = models.CharField(max_length=100)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.layer.name}"
    