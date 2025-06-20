from django.urls import path
from django.urls.resolvers import URLPattern
from typing import List
from .views import ChatView

urlpatterns: List[URLPattern] = [
    path(
        route='chat/',
        view=ChatView.as_view(),
        name='chat',
        kwargs={'document_dir': 'documents'}  # Pass documents directory to the view
    ),
]

app_name = 'chatbot'  # Add namespace for the chatbot app
