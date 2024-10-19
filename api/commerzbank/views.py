from api import settings
import requests
from .func import refresh_oauth_token
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Contract, CreditCard, LoanOffer, LoyalProgram, Reservation, UpcomingPayment, UserLayer, Transaction, TransactionCategory, Recipe, RecipeItem
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db import transaction
import base64
from django.conf import settings
from openai import AzureOpenAI
from chatai.func import send_prompt_to_azure_openai
import json
from decimal import Decimal



class UserLayoutProvider(APIView):
    def get(self, request):
        try:
            user = request.user
            if user:
                userLayer = UserLayer.objects.filter(user=user).first()
                try:    
                    user_data = {
                        "answer_1": userLayer.answer_1,
                    "answer_2": userLayer.answer_2,
                    "answer_3": userLayer.answer_3,
                    "answer_4": userLayer.answer_4,
                    "result": userLayer.result,
                    "layout": userLayer.layout,
                    "datetime": userLayer.datetime
                    }
                    return Response(user_data, status=status.HTTP_200_OK)
                except:
                    return Response({"message": "No user layer exists"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"message": "No users exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        data = request.data
        print(request.user)
        user_obj = request.user

        # Validate input data
        required_fields = ['answer_1', 'answer_2', 'answer_3', 'answer_4']
        for field in required_fields:
            if field not in data:
                return Response({"error": f"Missing required field: {field}"}, status=status.HTTP_400_BAD_REQUEST)

        # TODO: Implement logic to determine result and layout based on answers
        result = self.calculate_result(data)
        layout = self.determine_layout(result)

        try:
            user = UserLayer.objects.create(
                user=user_obj,
                answer_1=data['answer_1'],
                answer_2=data['answer_2'],
                answer_3=data['answer_3'],
                answer_4=data['answer_4'],
                result=result,
                layout=layout,
            )

            user_json = {
                "answer_1": user.answer_1,
                "answer_2": user.answer_2,
                "answer_3": user.answer_3,
                "answer_4": user.answer_4,
                "result": user.result,
                "layout": user.layout,
                "datetime": user.datetime
            }
            return Response(user_json, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def calculate_result(self, data):
        # TODO: Implement logic to calculate result based on answers
        return "Calculated Result"

    def determine_layout(self, result):
        # TODO: Implement logic to determine layout based on result
        return "Determined Layout"


class RegisterView(APIView):
    permission_classes = []
    authentication_classes = []

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
        return Response({'success': 'Contract created successfully'}, status=status.HTTP_201_CREATED)

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
    permission_classes = [IsAuthenticated]
    
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
        try:
            upcoming_payment = UpcomingPayment.objects.create(
                user=request.user,
                name=data['name'],
                time=data['time'],
                date=data['date'],
                account_id=data['account_id']
            )
            return Response(
                {'success': 'Upcoming payment created successfully', 'id': upcoming_payment.id},
                status=status.HTTP_201_CREATED
            )
        except KeyError as e:
            return Response(
                {'error': f'Missing required field: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to create upcoming payment: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
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
    permission_classes = [IsAuthenticated]

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
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

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
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recipes = Recipe.objects.all()
        if recipes.exists():
            recipes_json = []
            for recipe in recipes:
                recipe_data = {
                    "id": recipe.id,
                    "data": recipe.date.strftime("%Y-%m-%d") if recipe.date else None,
                    "sklep": recipe.store,
                    "cena_laczna": str(recipe.total_price) if recipe.total_price else None,
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
    
    def post(self, request):
        if 'photo' not in request.FILES:
            return Response({'error': 'No photo provided'}, status=status.HTTP_400_BAD_REQUEST)

        photo = request.FILES['photo']
        
        # Create the recipe with just the photo
        recipe = Recipe.objects.create(photo=photo)

        # Convert the image to base64
        image_base64 = base64.b64encode(photo.read()).decode('utf-8')

        # Prepare the prompt for the AI service
        prompt = """
        Analyze the recipe in this photo and provide the following information in JSON format:
        {
            "date": "YYYY-MM-DD",
            "store": "Store name",
            "total_price": 0.00,
            "nip": "NIP number",
            "ingredients": [
                {
                    "name": "Ingredient name",
                    "unit_price": 0.00,
                    "quantity": 0.00
                }
            ]
        }
        If any information is not visible or cannot be determined, use null for that field.
        """

        try:
            # Initialize the Azure OpenAI client
            client = AzureOpenAI(
                api_key=settings.AZURE_OPENAI_API_KEY,
                api_version=settings.AZURE_OPENAI_API_VERSION,
                azure_endpoint=settings.AZURE_OPENAI_ENDPOINT
            )

            # Call the Azure OpenAI API
            response = client.chat.completions.create(
                model=settings.AZURE_OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that analyzes recipe images."},
                    {"role": "user", "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}}
                    ]}
                ]
            )

            # Extract the analysis result from the API response
            analysis_result = response.choices[0].message.content

            # Parse the JSON response
            recipe_data = json.loads(analysis_result)

            # Update the recipe with extracted data
            recipe.date = recipe_data.get('date')
            recipe.store = recipe_data.get('store', '')
            recipe.total_price = Decimal(recipe_data.get('total_price', 0))
            recipe.nip = recipe_data.get('nip', '')
            recipe.save()

            # Create recipe items
            for ingredient in recipe_data.get('ingredients', []):
                RecipeItem.objects.create(
                    recipe=recipe,
                    name=ingredient.get('name', ''),
                    unit_price=Decimal(ingredient.get('unit_price', 0)),
                    quantity=Decimal(ingredient.get('quantity', 0))
                )
            
            return Response({
                'success': 'Recipe analyzed and created successfully',
                'recipe_id': recipe.id,
                'analysis_result': recipe_data
            }, status=status.HTTP_201_CREATED)

        except json.JSONDecodeError:
            recipe.delete()
            return Response({'error': 'Failed to parse AI response'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # If an error occurs, delete the partially created recipe
            recipe.delete()
            return Response({'error': f'An error occurred during analysis: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoanOffersView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

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
            loan_amount=data['loan_amount'],
            interest_rate=data['interest_rate'],
            period=data['period'],
            description=data['description'],
            type=data['type']
        )
        return Response({'success': 'Loan offer created successfully'}, status=status.HTTP_201_CREATED)
    

class TestAIView(APIView):
    def get(self, request):
        result = send_prompt_to_azure_openai("Tell me a joke about programming.")
        return Response({"message": result})

        
#do tego wrocimy kiedys 
# class BranchView(APIView):
#     def get(self, request):
#         url = "https://api-sandbox.commerzbank.com/branches-api/1/v1"
#         headers = {
#             "Accept": "application/json",
#             "X-Api-Key": settings.COMMERZBANK_API_KEY,
#             "X-Secret-Key": settings.COMMERZBANK_API_SECRET
#         }

#         # Get query parameters
#         latitude = request.query_params.get('latitude')
#         longitude = request.query_params.get('longitude')
#         radius = request.query_params.get('radius')

#         # Add query parameters to the URL if provided
#         if latitude and longitude and radius:
#             url += f"?latitude={latitude}&longitude={longitude}&radius={radius}"

#         try:
#             response = requests.get(url, headers=headers)
#             if response.status_code == 200:
#                 return Response(response.json(), status=status.HTTP_200_OK)
#             else:
#                 return Response(
#                     {"error": "Request to Commerzbank Branches API failed", "status_code": response.status_code},
#                     status=response.status_code
#                 )
#         except requests.RequestException as e:
#             return Response(
#                 {"error": f"Request to Commerzbank Branches API failed: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

class LoyalProgramView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        loyal_program = LoyalProgram.objects.all()
        if loyal_program.exists():
            loyal_program_json = []
            for program in loyal_program:
                loyal_program_data = {
                    "id": program.id,
                    "name": program.name,
                    "description": program.description,
                    "points": program.points
                }
                loyal_program_json.append(loyal_program_data)
            return Response(loyal_program_json, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No loyal programs exist"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        data = request.data
        loyal_program = LoyalProgram.objects.create(
            name=data['name'],
            description=data['description'],
            points=data['points']
        )
        return Response({'success': 'Loyal program created successfully'}, status=status.HTTP_201_CREATED)
        

