from django.urls import path
from .views import VocabAPI
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'vocab', VocabAPI, 'vocab')
urlpatterns = router.urls