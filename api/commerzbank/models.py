from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from openai import AzureOpenAI
import base64
import json
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
    layout = models.CharField(max_length=100)
    datetime = models.DateTimeField(auto_now_add=True)
    access_token = models.CharField(max_length=100, null=True, blank=True)
    refresh_token = models.CharField(max_length=100, null=True, blank=True)
    expires_in = models.IntegerField(null=True, blank=True)

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
    name = models.CharField(max_length=100)
    time = models.TimeField()
    date = models.DateField()
    account_id = models.CharField(max_length=100)  # Adjust max_length as needed

    def __str__(self):
        return f"Payment for {self.user.username} on {self.date} at {self.time}"

    class Meta:
        ordering = ['date', 'time']  # Optional: orders payments by date and time

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
    id = models.AutoField(primary_key=True)
    account_id = models.IntegerField()
    transaction_name = models.CharField(max_length=250)
    from_account = models.IntegerField()
    to_account = models.IntegerField()
    amount = models.IntegerField()
    categories = models.ManyToManyField(TransactionCategory, related_name='transactions' , blank=True)

    def __str__(self):
        return f"Transaction {self.id}: {self.transaction_name}"
    
    
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
    photo = models.ImageField(upload_to='recipes/')
    date = models.DateField(null=True, blank=True)
    store = models.CharField(max_length=255, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    nip = models.CharField(max_length=20, blank=True)
    ai_analyzed = models.BooleanField(default=False)

    def __str__(self):
        return f"Recipe {self.id}"
    
    def save(self, *args, **kwargs):
        if not self.date:
            self.date = datetime.now().date()
        
        try:
            with transaction.atomic():
                super().save(*args, **kwargs)
                if not self.ai_analyzed and self.photo:
                    self.analyze_recipe()
        except Exception as e:
            # Log the error
            print(f"Error saving recipe: {str(e)}")
            # Re-raise the exception to be handled by the caller
            raise

    def analyze_recipe(self):
        try:
            # Initialize the Azure OpenAI client
            client = AzureOpenAI(
                api_key=settings.AZURE_OPENAI_API_KEY,
                api_version=settings.AZURE_OPENAI_API_VERSION,
                azure_endpoint=settings.AZURE_OPENAI_API_ENDPOINT
            )

            # Convert the image to base64
            with self.photo.open('rb') as image_file:
                image_base64 = base64.b64encode(image_file.read()).decode('utf-8')

            # Prepare the prompt
            prompt = """
            Analyze the recipe in this photo and provide the following information in JSON format:
            {
                "date": "YYYY-MM-DD",
                "store": "Store name",
                "total_price": 0.00,
                "nip": "NIP number",
                "ingredients": [
                    {
                        "name": "Ingredient name",
                        "unit_price": 0.00,
                        "quantity": 0.00
                    }
                ]
            }
            If any information is not visible or cannot be determined, use null for that field.
            """

            # Call the Azure OpenAI API
            response = client.chat.completions.create(
                model=settings.AZURE_OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that analyzes recipe images."},
                    {"role": "user", "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}}
                    ]}
                ]
            )

            # Extract and process the analysis result
            analysis_result = response.choices[0].message.content
            recipe_data = json.loads(analysis_result)

            # Update recipe fields
            self.date = recipe_data.get('date') or self.date
            self.store = recipe_data.get('store', '') or self.store
            self.total_price = Decimal(recipe_data.get('total_price', 0)) or self.total_price
            self.nip = recipe_data.get('nip', '') or self.nip

            # Create recipe items
            for ingredient in recipe_data.get('ingredients', []):
                RecipeItem.objects.create(
                    recipe=self,
                    name=ingredient.get('name', ''),
                    unit_price=Decimal(ingredient.get('unit_price', 0)),
                    quantity=Decimal(ingredient.get('quantity', 0))
                )

            self.ai_analyzed = True
            self.save()

        except Exception as e:
            print(f"An error occurred during recipe analysis: {str(e)}")
            # Optionally, you can set a flag or add a field to indicate analysis failure
            self.ai_analyzed = False
            self.save()

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
    
