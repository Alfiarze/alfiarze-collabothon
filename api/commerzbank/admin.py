from django.contrib import admin
from .models import Contract, CreditCard, UpcomingPayment


admin.site.register(Contract)
admin.site.register(UpcomingPayment)
admin.site.register(CreditCard)