from rest_framework.authentication import SessionAuthentication
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