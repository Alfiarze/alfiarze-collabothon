import os
import requests
import base64
from django.conf import settings
import time
import random
from requests.exceptions import RequestException
import openai

# Configuration
API_KEY = settings.OPENAI_API_KEY
openai.api_key = API_KEY

# Payload for the request
payload = {
    "model": "gpt-4-vision-preview",
    "messages": [
        {
            "role": "system",
            "content": "Jesteś asystentem AI, który ułatwia użytkownikom znajdowanie informacji."
        }
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "max_tokens": 800
}

def analyze_text(text, image_path=None, max_retries=5, initial_delay=1):
    retries = 0
    while retries < max_retries:
        try:
            message = {"role": "user", "content": [{"type": "text", "text": text}]}
            
            if image_path:
                with open(image_path, "rb") as image_file:
                    encoded_image = base64.b64encode(image_file.read()).decode('ascii')
                    message["content"].append({
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{encoded_image}"}
                    })
            
            payload["messages"].append(message)

            response = openai.ChatCompletion.create(**payload)
            return response  # Return the response object

        except openai.error.RateLimitError as e:
            retries += 1
            if retries >= max_retries:
                raise SystemExit(f"Failed to make the request after {max_retries} retries. Error: {e}")
            
            delay = (2 ** retries) * initial_delay + random.uniform(0, 0.1 * (2 ** retries))
            print(f"Rate limit exceeded. Retrying in {delay:.2f} seconds...")
            time.sleep(delay)
        
        except openai.error.OpenAIError as e:
            raise SystemExit(f"Failed to make the request. Error: {e}")

    raise SystemExit("Unexpected error: Exceeded maximum retries without throwing an exception.")
