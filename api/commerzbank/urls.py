from django.urls import path

from commerzbank import views

urlpatterns = [
    path('userLayout/', views.UserLayoutProvider.as_view(), name='userLayout'),
    path('contracts/', views.ContractView.as_view(), name='contracts'),
    path('contracts/<int:contract_id>/', views.ContractView.as_view(), name='contract-detail'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('commerzbank/accounts/', views.AccountView.as_view(), name='accounts'),
    path('commerzbank/oauth/', views.OAuthView.as_view(), name='oauth'),
    path('upcoming-payments/', views.UpcomingPaymentView.as_view(), name='upcoming-payments'),
    path('credit-cards/', views.CreditCardView.as_view(), name='credit-cards'),
    path('transactions/', views.TransactionView.as_view(), name='transactions'),
    path('transactions/<int:transaction_id>/', views.TransactionView.as_view(), name='transaction-detail'),
    path('reservations/', views.ReservationView.as_view(), name='reservations'),
    path('recipes/', views.RecipeView.as_view(), name='recipes'),
    path('loan-offers/', views.LoanOffersView.as_view(), name='loan-offers'),
    path('commerzbank/branches/', views.CommerzbankBranchesView.as_view(), name='branches'),
    path('test-ai/', views.TestAIView.as_view(), name='test-ai'),
    path('loyal-programs/', views.LoyalProgramView.as_view(), name='loyal-programs'),
    path('ai-navigator/', views.AINavigatorView.as_view(), name='ai-navigator'),
    path('qr-codes/', views.GenerateQRCodeView.as_view(), name='qr-codes'),
    path('contracts/images/<str:filename>', views.serve_contract_image, name='contract-image'),
]
