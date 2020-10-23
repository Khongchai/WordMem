from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vocab
from .serializers import *
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import generics
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny




class VocabViewSet(viewsets.ModelViewSet):
    serializer_class = VocabSerializer
    #change to IsAuthenticated later
    permission_classes = [AllowAny,]
    queryset = Vocab.objects.all().order_by("-id")

    #Currently no CRUD overrides.





"""
Configure the authentication system
Then create a login page 
Write custom edit delete and create views taking into account the currently logged in user

class EditVocab(generics.UpdateAPIView):
    queryset = Vocab.objects.all().order_by("-id")
    serializer_class = VocabSerializer

class DeleteVocab(generics.DestroyAPIView):
    queryset = Vocab.objects.all().order_by("-id")
    serializer_class = VocabSerializer
"""



