import os
import requests
import base64
from django.conf import settings

# Configuration
API_KEY = settings.AZURE_OPENAI_API_KEY
headers = {
    "Content-Type": "application/json",
    "api-key": API_KEY,
}

# Payload for the request
payload = {
  "messages": [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "Jesteś asystentem AI, który ułatwia użytkownikom znajdowanie informacji."
        }
      ]
    }
  ],
  "temperature": 0.7,
  "top_p": 0.95,
  "max_tokens": 800
}

ENDPOINT = "https://alfiarzepl.openai.azure.com/openai/deployments/gpt-4-alfiarze/chat/completions?api-version=2024-02-15-preview"



def analyze_text(text, image_path=None):
    try:

        payload["messages"][0]["content"][0]["text"] = text
        if image_path:
            encoded_image = base64.b64encode(open(image_path, 'rb').read()).decode('ascii')
            payload["messages"][0]["content"][0]["image_url"] = {"url": f"data:image/png;base64,{encoded_image}"}

        response = requests.post(ENDPOINT, headers=headers, json=payload)
        response.raise_for_status()
    except requests.RequestException as e:
        raise SystemExit(f"Failed to make the request. Error: {e}")

    return response.json()