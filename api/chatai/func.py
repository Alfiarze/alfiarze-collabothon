import os
import requests
import base64
from django.conf import settings
import time
import random
from requests.exceptions import RequestException

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


def analyze_text(text, image_path=None, endpoint=ENDPOINT, max_retries=5, initial_delay=1):
    retries = 0
    while retries < max_retries:
        try:
            print(endpoint)
            payload["messages"][0]["content"][0]["text"] = text
            if image_path:
                encoded_image = base64.b64encode(open(image_path, 'rb').read()).decode('ascii')
                payload["messages"][0]["content"][0]["image_url"] = {"url": f"data:image/png;base64,{encoded_image}"}

            response = requests.post(endpoint, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()  # Return the JSON response if successful
        except RequestException as e:
            if response.status_code == 429:
                retries += 1
                if retries >= max_retries:
                    raise SystemExit(f"Failed to make the request after {max_retries} retries. Error: {e}")
                
                # Calculate delay with exponential backoff and jitter
                delay = (2 ** retries) * initial_delay + random.uniform(0, 0.1 * (2 ** retries))
                print(f"Rate limit exceeded. Retrying in {delay:.2f} seconds...")
                time.sleep(delay)
            else:
                raise SystemExit(f"Failed to make the request. Error: {e}")

    raise SystemExit("Unexpected error: Exceeded maximum retries without throwing an exception.")

import os
import requests
import base64
from django.conf import settings
import time
import random
from requests.exceptions import RequestException

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


def analyze_text(text, image_path=None, endpoint=ENDPOINT, max_retries=5, initial_delay=1):
    retries = 0
    while retries < max_retries:
        try:
            print(endpoint)
            payload["messages"][0]["content"][0]["text"] = text
            if image_path:
                encoded_image = base64.b64encode(open(image_path, 'rb').read()).decode('ascii')
                payload["messages"][0]["content"][0]["image_url"] = {"url": f"data:image/png;base64,{encoded_image}"}

            response = requests.post(endpoint, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()  # Return the JSON response if successful
        except RequestException as e:
            if response.status_code == 429:
                retries += 1
                if retries >= max_retries:
                    raise SystemExit(f"Failed to make the request after {max_retries} retries. Error: {e}")
                
                # Calculate delay with exponential backoff and jitter
                delay = (2 ** retries) * initial_delay + random.uniform(0, 0.1 * (2 ** retries))
                print(f"Rate limit exceeded. Retrying in {delay:.2f} seconds...")
                time.sleep(delay)
            else:
                raise SystemExit(f"Failed to make the request. Error: {e}")

    raise SystemExit("Unexpected error: Exceeded maximum retries without throwing an exception.")