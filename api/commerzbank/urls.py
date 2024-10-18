from django.urls import path

from commerzbank import views

urlpatterns = [
    path('userLayout/', views.UserLayoutProvider.as_view(), name='userLayout'),
    path('contracts/', views.ContractView.as_view(), name='contracts'),
    path('contacts/', views.ContactView.as_view(), name='contacts'),
]