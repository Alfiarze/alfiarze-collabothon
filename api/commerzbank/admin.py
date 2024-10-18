from django.contrib import admin
from .models import Contract, CreditCard, Recipe, RecipeItem, Reservation, Transaction, UpcomingPayment


admin.site.register(Contract)
admin.site.register(UpcomingPayment)
admin.site.register(CreditCard)
admin.site.register(Transaction)
admin.site.register(Reservation)
admin.site.register(Recipe)
admin.site.register(RecipeItem)
