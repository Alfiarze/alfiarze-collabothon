from api import settings
import requests
from .func import refresh_oauth_token
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Contract, CreditCard, UpcomingPayment, UserLayer, Transaction
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404



class UserLayoutProvider(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

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
    authentication_classes = []
    permission_classes = []

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
    authentication_classes = []
    permission_classes = []

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
    def get(self, request):
        authentication_classes = []
        permission_classes = []

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
    authentication_classes = []
    permission_classes = []
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
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

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
                    "amount": transaction.amount
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
            return Response({
                'success': 'Transaction created successfully',
                'transaction_id': transaction.id
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
            transaction.save()
            return Response({'success': 'Transaction updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id)
        transaction.delete()
        return Response({'success': 'Transaction deleted successfully'}, status=status.HTTP_204_NO_CONTENT)





