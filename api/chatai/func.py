from openai import AzureOpenAI
from django.conf import settings

def send_prompt_to_azure_openai(prompt):
    # Configure Azure OpenAI client
    client = AzureOpenAI(
        api_key=settings.AZURE_OPENAI_API_KEY,
        api_version=settings.AZURE_OPENAI_API_VERSION,
        azure_endpoint=settings.AZURE_OPENAI_API_ENDPOINT
    )

    try:
        # Send the prompt to Azure OpenAI
        response = client.chat.completions.create(
            model="gpt-35-turbo",  # Adjust this to match your deployed model name
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )

        # Extract and return the generated text
        return response.choices[0].message.content.strip()
    except Exception as e:
        # Handle any errors
        return f"Error: {str(e)}"

# Example usage
if __name__ == "__main__":
    result = send_prompt_to_azure_openai("Tell me a joke about programming.")
    print(result)
