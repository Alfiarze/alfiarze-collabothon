from openai import AzureOpenAI
from django.conf import settings

client = AzureOpenAI(
    api_key=settings.AZURE_OPENAI_API_KEY,
    api_version=settings.AZURE_OPENAI_API_VERSION,
    azure_endpoint=settings.AZURE_OPENAI_API_ENDPOINT
)

def get_gpt4_response(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-4",  # Make sure this model name is correct for your Azure setup
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in GPT-4 request: {str(e)}")
        return None


