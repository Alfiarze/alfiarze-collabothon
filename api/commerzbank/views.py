from api import settings
import requests
from .func import refresh_oauth_token
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Contract, CreditCard, LoanOffer, Reservation, UpcomingPayment, UserLayer, Transaction, TransactionCategory, Recipe, RecipeItem
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db import transaction



class UserLayoutProvider(APIView):
    #authentication_classes = []
    #permission_classes = []

    def get(self, request):
        users = UserLayer.objects.all()
        if users.exists():
            users_json = []
            for user in users:
                user_data = {
                    "answer_1": user.answer_1,
                    "answer_2": user.answer_2,
                    "answer_3": user.answer_3,
                    "answer_4": user.answer_4,
                    "result": user.result,
                    "layout": user.layout.name if user.layout else None,
                    "datetime": user.datetime
                }
                users_json.append(user_data)
            return Response(users_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No users exist"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        data = request.data
        user = UserLayer.objects.create(
            answer_1=data['answer_1'],
            answer_2=data['answer_2'],
            answer_3=data['answer_3'],
            answer_4=data['answer_4'],
            result=data['result'],
            layout=data['layout'],
            datetime=data['datetime']
        )
        user_json = {
            "answer_1": user.answer_1,
            "answer_2": user.answer_2,
            "answer_3": user.answer_3,
            "answer_4": user.answer_4,
            "result": user.result,
            "layout": user.layout.name,
            "datetime": user.datetime
        }
        return Response(user_json, status=status.HTTP_201_CREATED)


class RegisterView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'Please provide username, password and email'})

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'})

        user = User.objects.create_user(username=username, password=password, email=email)

        return Response({'success': 'User created successfully'})

        pass

class ContractView(APIView):
    #authentication_classes = []
    #permission_classes = []

    def get(self, request):
        contracts = Contract.objects.all()
        if contracts.exists():
            contracts_json = []
            for contract in contracts:
                contract_data = {
                    "id": contract.id,
                    "user_id": contract.user_id,
                    "contract_id": contract.contract_id,
                    "contract_type": contract.contract_type,
                    "amount": contract.amount,
                    "start_date": contract.start_date,
                    "end_date": contract.end_date,
                    "status": contract.status
                }
                contracts_json.append(contract_data)
            return Response(contracts_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No contracts exist"}, status=status.HTTP_404_NOT_FOUND)
                

    def post(self, request):
        data = request.data
        contract = Contract.objects.create(
            user_id=data['user_id'],
            contract_id=data['contract_id'],
            contract_type=data['contract_type'],
            amount=data['amount'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            status=data['status']
        )
        return Response({'success': 'Contract created successfully'})

class AccountView(APIView):
    def get(self, request):
        url = "https://api-sandbox.commerzbank.com/accounts/v1/accounts"
        headers = {
            "Accept": "application/json",
            "X-Api-Key": settings.COMMERZBANK_API_KEY,
            "X-Secret-Key": settings.COMMERZBANK_SECRET_KEY
        }

        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Request to Commerzbank API failed", "status_code": response.status_code},
                    status=response.status_code
                )
        except requests.RequestException as e:
            return Response(
                {"error": f"Request to Commerzbank API failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class UpcomingPaymentView(APIView):
    #authentication_classes = []
    #permission_classes = []
    def get(self, request):

        upcoming_payments = UpcomingPayment.objects.all()
        if upcoming_payments.exists():
            upcoming_payments_json = []
            for payment in upcoming_payments:
                upcoming_payment_data = {
                    "id": payment.id,
                    "user": payment.user.username,
                    "name": payment.name,
                    "time": payment.time,
                    "date": payment.date,
                    "account_id": payment.account_id
                }
                upcoming_payments_json.append(upcoming_payment_data)
            return Response(upcoming_payments_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No upcoming payments exist"}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request):
        data = request.data
        upcoming_payment = UpcomingPayment.objects.create(
            user=data['user'],
            name=data['name'],
            time=data['time'],
            date=data['date'],
            account_id=data['account_id']
        )
        return Response({'success': 'Upcoming payment created successfully'})
    
class CreditCardView(APIView):
    #authentication_classes = []
    #permission_classes = []
    def get(self, request):
        credit_cards = CreditCard.objects.all()
        if credit_cards.exists():
            credit_cards_json = []
            for credit_card in credit_cards:
                credit_card_data = {
                    "id": credit_card.id,
                    "card_type": credit_card.card_type,
                    "card_name": credit_card.card_name,
                    "card_number": credit_card.card_number,
                    "cvv": credit_card.cvv,
                    "date_of_expiry": credit_card.date_of_expiry,
                }
                credit_cards_json.append(credit_card_data)
            return Response(credit_cards_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No credit cards exist"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        data = request.data
        credit_card = CreditCard.objects.create(
            user=data['user'],
            card_type=data['card_type'],
            card_name=data['card_name'],
            card_number=data['card_number'],
            cvv=data['cvv'],
            date_of_expiry=data['date_of_expiry']
        )
        return Response({'success': 'Credit card created successfully'})

class OAuthView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "OAuth view"})

    def post(self, request):
        try:
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Log the user information for debugging
            print(f"User: {user.username} is attempting to refresh token.")

            response = refresh_oauth_token(user, "client_credentials")

            if response:
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to refresh token"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            # Log the exception for debugging
            print(f"Exception occurred: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TransactionView(APIView):
    #authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.all()
        if transactions.exists():
            transactions_json = []
            for transaction in transactions:
                transaction_data = {
                    "id": transaction.id,
                    "account_id": transaction.account_id,
                    "transaction_name": transaction.transaction_name,
                    "from_account": transaction.from_account,
                    "to_account": transaction.to_account,
                    "amount": str(transaction.amount),
                    "categories": [category.name for category in transaction.categories.all()]
                }
                transactions_json.append(transaction_data)
            return Response(transactions_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No transactions exist"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        data = request.data
        try:
            transaction = Transaction.objects.create(
                account_id=data['account_id'],
                transaction_name=data['transaction_name'],
                from_account=data['from_account'],
                to_account=data['to_account'],
                amount=data['amount']
            )
            
            # Handle categories
            category_names = data.get('categories', [])
            for category_name in category_names:
                category, created = TransactionCategory.objects.get_or_create(name=category_name)
                transaction.categories.add(category)
            
            return Response({
                'success': 'Transaction created successfully',
                'transaction_id': transaction.id,
                'categories': [category.name for category in transaction.categories.all()]
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return Response({'error': f'Missing required field: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id)
        data = request.data
        try:
            transaction.account_id = data.get('account_id', transaction.account_id)
            transaction.transaction_name = data.get('transaction_name', transaction.transaction_name)
            transaction.from_account = data.get('from_account', transaction.from_account)
            transaction.to_account = data.get('to_account', transaction.to_account)
            transaction.amount = data.get('amount', transaction.amount)
            
            # Update categories
            if 'categories' in data:
                transaction.categories.clear()
                for category_name in data['categories']:
                    category, created = TransactionCategory.objects.get_or_create(name=category_name)
                    transaction.categories.add(category)
            
            transaction.save()
            return Response({
                'success': 'Transaction updated successfully',
                'categories': [category.name for category in transaction.categories.all()]
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id)
        transaction.delete()
        return Response({'success': 'Transaction deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class ReservationView(APIView):
    #authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        reservations = Reservation.objects.all()
        if reservations.exists():
            reservations_json = []
            for reservation in reservations:
                reservation_data = {
                    "id": reservation.id,
                    "user": reservation.user.username,
                    "name": reservation.name,
                    "time": reservation.time,
                    "date": reservation.date,
                    "status": reservation.status
                }
                reservations_json.append(reservation_data)
            return Response(reservations_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No reservations exist"}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request):
        data = request.data
        reservation = Reservation.objects.create(
            user=data['user'],
            name=data['name'],
            time=data['time'],
            date=data['date'],
            status=data['status']
        )
        return Response({'success': 'Reservation created successfully'})

class RecipeView(APIView):
    #authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        recipes = Recipe.objects.all()
        if recipes.exists():
            recipes_json = []
            for recipe in recipes:
                recipe_data = {
                    "id": recipe.id,
                    "data": recipe.date.strftime("%Y-%m-%d"),
                    "sklep": recipe.store,
                    "cena_laczna": str(recipe.total_price),
                    "produkty": [
                        {
                            "nazwa": item.name,
                            "cena_jednostkowa": str(item.unit_price),
                            "ilosc": item.quantity
                        } for item in recipe.items.all()
                    ],
                    "NIP": recipe.nip,
                    "photo": recipe.photo.url if recipe.photo else None
                }
                recipes_json.append(recipe_data)
            return Response(recipes_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No recipes exist"}, status=status.HTTP_404_NOT_FOUND)

    @transaction.atomic
    def post(self, request):
        data = request.data
        try:
            recipe = Recipe.objects.create(
                date=data['data'],
                store=data['sklep'],
                total_price=data['cena_laczna'],
                nip=data['NIP'],
                photo=data['photo']
            )
            
            for product in data['produkty']:
                RecipeItem.objects.create(
                    recipe=recipe,
                    name=product['nazwa'],
                    unit_price=product['cena_jednostkowa'],
                    quantity=product['ilosc']
                )
            
            return Response({
                'success': 'Recipe created successfully',
                'recipe_id': recipe.id
            }, status=status.HTTP_201_CREATED)
        except KeyError as e:
            return Response({'error': f'Missing required field: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # You can add put and delete methods here if needed

class LoanOffersView(APIView):
    #authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        loan_offers = LoanOffer.objects.all()
        if loan_offers.exists():
            loan_offers_json = []
            for loan_offer in loan_offers:
                loan_offer_data = {
                    "id": loan_offer.id,
                    "loan_amount": loan_offer.loan_amount,
                    "interest_rate": loan_offer.interest_rate,
                    "period": loan_offer.period,
                    "description": loan_offer.description,
                    "type": loan_offer.type
                    }
                loan_offers_json.append(loan_offer_data)
            return Response(loan_offers_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No loan offers exist"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        data = request.data
        loan_offer = LoanOffer.objects.create(
            id=data['id'],
            loan_amount=data['loan_amount'],
            interest_rate=data['interest_rate'],
            period=data['period'],
            description=data['description'],
            type=data['type']
        )
        return Response({'success': 'Loan offer created successfully'})
    

        

class BranchView(APIView):
    def get(self, request):
        url = "https://api-sandbox.commerzbank.com/branches/v1/branches"
        headers = {
            "Accept": "application/json",
            "X-Api-Key": settings.COMMERZBANK_API_KEY,
            "X-Secret-Key": settings.COMMERZBANK_SECRET_KEY
        }

        # Get query parameters
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')
        radius = request.query_params.get('radius')

        # Add query parameters to the URL if provided
        if latitude and longitude and radius:
            url += f"?latitude={latitude}&longitude={longitude}&radius={radius}"

        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Request to Commerzbank Branches API failed", "status_code": response.status_code},
                    status=response.status_code
                )
        except requests.RequestException as e:
            return Response(
                {"error": f"Request to Commerzbank Branches API failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
