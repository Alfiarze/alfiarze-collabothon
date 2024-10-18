from django.urls import path

from commerzbank import views

urlpatterns = [
    path('userLayout/', views.UserLayoutProvider.as_view(), name='userLayout'),
    path('contracts/', views.ContractView.as_view(), name='contracts'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('commerzbank/accounts/', views.AccountView.as_view(), name='accounts'),
    path('commerzbank/oauth/', views.OAuthView.as_view(), name='oauth'),
]
