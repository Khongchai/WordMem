from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('vocab-list', views.vocab_list, name="vocab-list"),
]