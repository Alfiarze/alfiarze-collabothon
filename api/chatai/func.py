import os
import requests
import base64
from django.conf import settings
import time
import random
from requests.exceptions import RequestException
from openai import OpenAI

# Configuration
API_KEY = settings.OPENAI_API_KEY
client = OpenAI(api_key=API_KEY)
def analyze_text(text, prompt=None, model="gpt-4", image_path=None, max_retries=5, initial_delay=1):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "user",
                "content": text
            }
        ],
        temperature=0.7,
        max_tokens=2048,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    print(response)
    # Extract the content from the response
    return response.choices[0].message.content
