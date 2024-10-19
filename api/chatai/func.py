from openai import AzureOpenAI
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_prompt_to_azure_openai(prompt):
    try:
        # Configure Azure OpenAI client
        client = AzureOpenAI(
            api_key=settings.AZURE_OPENAI_API_KEY,
            api_version=settings.AZURE_OPENAI_API_VERSION,
            azure_endpoint=settings.AZURE_OPENAI_API_ENDPOINT
        )

        # Log configuration details (be careful not to log the API key)
        logger.info(f"Connecting to Azure OpenAI with endpoint: {settings.AZURE_OPENAI_API_ENDPOINT}")
        logger.info(f"Using API version: {settings.AZURE_OPENAI_API_VERSION}")
        logger.info(f"Using location: {settings.AZURE_OPENAI_API_LOCATION}")

        # Send the prompt to Azure OpenAI
        response = client.chat.completions.create(
            model="gpt-35-turbo",  # Make sure this model is deployed in your Azure OpenAI resource
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )

        # Extract and return the generated text
        return response.choices[0].message.content.strip()
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
