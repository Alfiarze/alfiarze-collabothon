from api import settings
import requests

from commerzbank.models import UserLayer

def get_oauth_token(user):
    user_layer = UserLayer.objects.get(user=user)
    return user_layer.access_token

def refresh_oauth_token(user, grant_type):
    client_id = settings.COMMERCZBANK_CLIENT_ID
    client_secret = settings.COMMERCZBANK_CLIENT_SECRET

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

    print(response.json())
    
    if response.status_code == 200:
        user_layer = UserLayer.objects.get(user=user)
        try:
            user_layer.access_token = response.json().get('access_token')
            user_layer.refresh_token = response.json().get('refresh_token')
            user_layer.expires_in = response.json().get('expires_in')
            user_layer.save()
        except Exception as e:
            print(e)
        return response.json()
    else:
        return None
    
