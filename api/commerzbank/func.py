

from urllib import request
from api import settings
import requests

from commerzbank.models import UserLayer

def get_oauth_token(user):
    user_layer = UserLayer.objects.get(user=user)
    return user_layer.access_token

def refresh_oauth_token(user):
    client_id = settings.COMMERCZBANK_CLIENT_ID
    client_secret = settings.COMMERCZBANK_CLIENT_SECRET
    grant_type = request.data.get('grant_type', 'client_credentials')  # Default to client_credentials

    token_url = "https://api-sandbox.commerzbank.com/auth/realms/sandbox/protocol/openid-connect/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": grant_type,
        "client_id": client_id,
        "client_secret": client_secret
    }
    
    response = requests.post(token_url, headers=headers, data=data)
    
    if response.status_code == 200:
        user_layer = UserLayer.objects.get(user=user)
        user_layer.access_token = response.json().get('access_token')
        user_layer.refresh_token = response.json().get('refresh_token')
        user_layer.expires_in = response.json().get('expires_in')
        user_layer.save()
        return response.json()
    else:
        return None
    
