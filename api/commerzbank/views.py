from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Contract, UserLayer
from django.core.exceptions import ObjectDoesNotExist



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


# class RegisterView(APIView):
#     authentication_classes = []
#     permission_classes = []
#
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         email = request.data.get('email')
#
#         if not username or not password or not email:
#             return Response({'error': 'Please provide username, password and email'})
#
#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'Username already exists'})
#
#         user = User.objects.create_user(username=username, password=password, email=email)
#
#         return Response({'success': 'User created successfully'})
#
#         pass
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