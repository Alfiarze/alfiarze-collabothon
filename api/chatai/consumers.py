import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .func import analyze_text

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send the message to Azure OpenAI and await the response
        response = await self.send_to_azure_openai(message)

        # Send the response back to the WebSocket
        await self.send(text_data=json.dumps({
            'message': response
        }))

    async def send_to_azure_openai(self, message):
        # Use the existing function from func.py
        response = await analyze_text(message)
        # Ensure the response is a string or JSON serializable object
        return str(response)