from django.urls import path

from commerzbank import views

urlpatterns = [
    path('userLayout/', views.UserLayoutProvider.as_view(), name='userLayout'),
]