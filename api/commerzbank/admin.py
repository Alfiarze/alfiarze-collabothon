from django.contrib import admin
from .models import Contract, CreditCard, LoanOffer, LoyalProgram, QRCode, Recipe, RecipeItem, Reservation, Transaction, UpcomingPayment, UserLayer


admin.site.register(Contract)
admin.site.register(UpcomingPayment)
admin.site.register(CreditCard)
admin.site.register(Transaction)
admin.site.register(Reservation)
admin.site.register(RecipeItem)
admin.site.register(LoanOffer)
admin.site.register(LoyalProgram)
admin.site.register(Recipe)
admin.site.register(UserLayer)
admin.site.register(QRCode)
