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
    
class Contract(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contract_id = models.CharField(max_length=100)
    contract_type = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    file = models.FileField(upload_to='contracts/', null=True, blank=True)
    status = models.CharField(max_length=100)
    name = models.CharField(max_length=100)  # Example field

    def __str__(self):
        return self.name  # or any other appropriate string representation
    
class UpcomingPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.TimeField()
    date = models.DateField()
    account_id = models.CharField(max_length=100)  # Adjust max_length as needed

    def __str__(self):
        return f"Payment for {self.user.username} on {self.date} at {self.time}"

    class Meta:
        ordering = ['date', 'time']  # Optional: orders payments by date and time
