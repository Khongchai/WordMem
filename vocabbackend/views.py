from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import generics
from .serializers import *
from django.contrib.auth import authenticate, login, logout


@api_view(["GET"])
def apiOverview(request):
    #this view returns list of all available APIs.
    api_urls = {
        "List": '/vocab-list/',
        "Edit": '/vocab-edit/<',
        "Delete": '/vocab-delete/<id>',
    }
    return Response(api_urls)


@api_view(["GET"])
def vocab_list(request):
    cur_user = request.user
    vocab_list = Vocab.objects.filter(owner=cur_user)
    serializer = VocabSerializer(vocab_list, many=True)

    return Response(serializer.data)




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



