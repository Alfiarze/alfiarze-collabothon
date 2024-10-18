from api import settings
import requests
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Contract, UpcomingPayment, UserLayer
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from .func import refresh_oauth_token



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
        

class OAuthView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "OAuth view"})

    def post(self, request):
        try:
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            response = refresh_oauth_token(user)

            if response:
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to refresh token"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
                    "user": payment.user,
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