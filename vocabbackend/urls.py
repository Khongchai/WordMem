from django.urls import path
from .views import VocabAPI, get_definitions
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'vocab', VocabAPI, 'vocab')
router.register(r'get_definitions', get_definitions, "get_definitions")
urlpatterns = router.urls