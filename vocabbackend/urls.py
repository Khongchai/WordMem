from django.urls import path, include
from .views import VocabAPI, GetDefinitionAPICambridge, GetDefinitionAPIOxford
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'vocab', VocabAPI, 'vocab')

urlpatterns = [
    path('', include(router.urls)),
    path('definition_cambridge/<str:word>', GetDefinitionAPICambridge.as_view(), name="cambridge_api"),
    path("definition_oxford/<str:word>", GetDefinitionAPIOxford.as_view(), name="oxford_api")
]