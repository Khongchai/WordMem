from django.urls import path
from .views import VocabAPI, GetDefinitionAPICambridge
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'vocab', VocabAPI, 'vocab')
router.register(r'definition_cambridge', GetDefinitionAPICambridge, "get_definitions")
urlpatterns = router.urls