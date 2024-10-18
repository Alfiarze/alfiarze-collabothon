from rest_framework.authentication import SessionAuthentication
from rest_framework.authtoken.admin import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserLayer



class UserLayoutProvider(APIView):
    authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = UserLayer.objects.all()

        # user_json = {
        #     "answer_1": user.answer_1,
        #     "answer_2": user.answer_2,
        #     "answer_3": user.answer_3,
        #     "answer_4": user.answer_4,
        #     "result": user.result,
        #     "layout": user.layout.name,
        #     "datetime": user.datetime
        # }
        user_json = { "test": "test" }

        return Response(user_json)



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