from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from openai import AzureOpenAI
from decimal import Decimal
from datetime import datetime
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.db import transaction

class UserLayer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer_1 = models.CharField(max_length=100)
    answer_2 = models.CharField(max_length=100)
    answer_3 = models.CharField(max_length=100)
    answer_4 = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    layout = models.CharField(max_length=1000)
    datetime = models.DateTimeField(auto_now_add=True)
    access_token = models.CharField(max_length=100, null=True, blank=True)
    refresh_token = models.CharField(max_length=100, null=True, blank=True)
    expires_in = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.layer.name}"
    
class Contract(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contract_type = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField(null=True, blank=True, default=datetime.now)
    end_date = models.DateField(null=True, blank=True)
    file = models.FileField(upload_to='contracts/', null=True, blank=True)
    status = models.CharField(max_length=100)
    name = models.CharField(max_length=100)  # Example field
    currency = models.CharField(max_length=6)
    account_number = models.CharField(max_length=26, null=True, blank=True)

    def __str__(self):
        return self.name  # or any other appropriate string representation
    
class UpcomingPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='upcoming_payments')
    name = models.CharField(max_length=100)
    date = models.DateField(null=True, blank=True)
    account_id = models.CharField(max_length=100)  # Adjust max_length as needed
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account_number = models.CharField(max_length=26, null=True, blank=True)

    def __str__(self):
        return f"Payment for {self.user.username} on {self.date}"

class CreditCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)
    cvv = models.CharField(max_length=3)
    date_of_expiry = models.DateField()
    card_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.card_name} - {self.card_number}"

class TransactionCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Transaction Categories"
      
class Transaction(models.Model):
    title = models.CharField(max_length=250)
    receiver = models.CharField(max_length=250)  # Changed from reciver_id
    receiver_address = models.CharField(max_length=250)  # Changed from reciver_address
    account_number = models.CharField(max_length=26)  # Changed from bank_account_number
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Changed from IntegerField

    def __str__(self):
        return f"{self.title}: {self.amount} to {self.receiver}"
    
    
class Reservation(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    time = models.TimeField()
    date = models.DateField()
    status = models.CharField(max_length=100)

    def __str__(self):
        return f"Reservation {self.id}: {self.name}"
    

class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    photo = models.ImageField(upload_to='recipes/')
    date = models.DateField(null=True, blank=True)
    store = models.CharField(max_length=255, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    nip = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"Recipe {self.id} by {self.user.username}"

class RecipeItem(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} for Recipe {self.recipe.id}"

class LoanOffer(models.Model):
    id = models.AutoField(primary_key=True)
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=10, decimal_places=2)
    period = models.IntegerField()
    description = models.TextField()
    type = models.CharField(max_length=100)

    def __str__(self):
        return f"Loan Offer {self.id}: {self.loan_amount} - {self.interest_rate}"

class LoyalProgram(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    points = models.IntegerField()

    def __str__(self):
        return f"Loyal Program {self.id}: {self.name}"

class QRCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, blank=True)

    def __str__(self):
        return self.code
