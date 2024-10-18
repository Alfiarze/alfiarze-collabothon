from django.contrib import admin
from .models import Contract, UpcomingPayment


admin.site.register(Contract)
admin.site.register(UpcomingPayment)