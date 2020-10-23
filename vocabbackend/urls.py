from django.urls import path
from .views import VocabViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'vocab', VocabViewSet, 'vocab')
urlpatterns = router.urls