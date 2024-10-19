import os
import requests
import base64
from django.conf import settings
import time
import random
from requests.exceptions import RequestException
from openai import OpenAI
from google.cloud import vision
import io
import logging
from pdf2image import convert_from_path
import docx2txt
import tempfile

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

def ocr_text_from_file(file_path):
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    try:
        file_extension = os.path.splitext(file_path)[1].lower()

        print(file_extension)

        if file_extension == '.pdf':
            return ocr_pdf(file_path)
        elif file_extension == '.docx':
            return extract_text_from_docx(file_path)
        elif file_extension in ['.jpg', '.jpeg', '.png', '.bmp', '.gif']:
            return ocr_image(file_path)
        else:
            return "Unsupported file format"

    except Exception as e:
        logger.exception(f"An error occurred during text extraction: {str(e)}")
        return f"Error: {str(e)}"

def ocr_image(image_path):
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    
    base64_image = base64.b64encode(content).decode('utf-8')
    
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Please extract and return all the text you can see in this image."},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
            ]
        }
    ]
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=1000
    )
    
    return response.choices[0].message.content

def ocr_pdf(pdf_path):
    client = vision.ImageAnnotatorClient()
    full_text = []

    with tempfile.TemporaryDirectory() as temp_dir:
        images = convert_from_path(pdf_path, output_folder=temp_dir)
        
        for i, image in enumerate(images):
            image_path = os.path.join(temp_dir, f'page_{i+1}.jpg')
            image.save(image_path, 'JPEG')
            
            with io.open(image_path, 'rb') as image_file:
                content = image_file.read()

            image = vision.Image(content=content)
            response = client.text_detection(image=image)

            if response.text_annotations:
                full_text.append(response.text_annotations[0].description)

    return "\n\n".join(full_text)

def extract_text_from_docx(docx_path):
    return docx2txt.process(docx_path)
