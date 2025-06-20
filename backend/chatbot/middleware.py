import logging
import traceback
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class APIErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except Exception as e:
            logger.error(f"API Error: {str(e)}\n{traceback.format_exc()}")
            return JsonResponse({
                'error': str(e),
                'detail': 'An unexpected error occurred'
            }, status=500)