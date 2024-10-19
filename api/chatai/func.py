# from .settings import AZURE_OPENAI_API_KEY, AZURE_OPENAI_API_ENDPOINT, AZURE_OPENAI_API_VERSION
import logging
import requests
import base64

logger = logging.getLogger(__name__)

def send_prompt_to_azure_openai(prompt):
    try:

        API_KEY = '77df61f00eef4063baba417606231f53'
        # IMAGE_PATH = "YOUR_IMAGE_PATH"
        # encoded_image = base64.b64encode(open(IMAGE_PATH, 'rb').read()).decode('ascii')
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
                "text": "You are an AI assistant that helps people find information."
                }
            ]
            },
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": prompt
                }
            ]
            }
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "max_tokens": 800
        }

        ENDPOINT = "https://alfiarze.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview"

        # Send request
        try:
            response = requests.post(ENDPOINT, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise SystemExit(f"Failed to make the request. Error: {e}")

    except Exception as e:
        # Log the full error details
        logger.error(f"Error in send_prompt_to_azure_openai: {str(e)}", exc_info=True)
        
        # Check for specific error types
        if "404" in str(e):
            error_message = "Error: Azure OpenAI resource not found. Please check your Azure OpenAI deployment and ensure the correct endpoint is configured."
        elif "401" in str(e):
            error_message = "Error: Unauthorized access to Azure OpenAI. Please check your API key and ensure it's correct and active."
        elif "ResourceNotFound" in str(e):
            error_message = "Error: The specified model 'gpt-35-turbo' was not found. Please ensure you have deployed this model in your Azure OpenAI resource."
        else:
            error_message = f"Error: Unable to connect to Azure OpenAI. Please check your configuration and ensure the service is available. Details: {str(e)}"
        
        logger.error(error_message)
        return error_message

if __name__ == "__main__":
    result = send_prompt_to_azure_openai("Dlaczego kacper backend wszystko psuje?.")
    print(result)

