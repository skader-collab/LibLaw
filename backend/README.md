# LibLaw Backend

This is the Django backend for the LibLaw application, providing AI-powered legal assistance through a REST API.

## Setup

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install django djangorestframework django-cors-headers python-dotenv langchain openai
```

3. Set up environment variables:
Create a `.env` file in the backend directory with:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

## API Endpoints

- POST `/api/chat/`: Send legal questions to the AI assistant
  - Request body: `{ "question": "your legal question here" }`
  - Response: `{ "response": "AI assistant's response" }`
  - Timeout: 60 seconds

## Configuration

- Django REST Framework timeout: 60 seconds
- ChatGPT model: gpt-3.5-turbo
- CORS: Enabled for development
- Debug mode: Enabled (disable in production)

## Error Handling

The API handles several types of errors:
- 400: Missing question in request
- 408: Request timeout
- 500: Server errors (including OpenAI API issues)

## Security Notes

For production:
1. Update SECRET_KEY in settings.py
2. Set DEBUG=False
3. Configure ALLOWED_HOSTS
4. Configure CORS_ALLOWED_ORIGINS instead of CORS_ALLOW_ALL_ORIGINS
5. Use environment variables for sensitive settings
