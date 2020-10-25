from django.urls import path, include
from .views import *
from knox import views as knox_views

urlpatterns = [
    #path('auth', include('knox.urls')), #might not need this
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]