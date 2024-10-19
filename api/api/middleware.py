async def your_middleware(get_response):
    async def middleware(request):
        # Do something before the view (and later middleware) are called.

        response = await get_response(request)

        # Do something after the view is called.

        return response

    return middleware