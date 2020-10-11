from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
#from .serializers import TaskSerializer
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import generics
from .serializers import *


@api_view(["GET"])
def apiOverview(request):
    #this view returns list of all available APIs.
    api_urls = {
        "List": '/vocab-list/',
    }
    return Response(api_urls)


@api_view(["GET"])
def vocab_list(request):
    cur_user = request.user
    print(cur_user)
    vocab_list = Vocab.objects.filter(owner=cur_user)
    serializer = VocabSerializer(vocab_list, many=True)
    return Response(serializer.data)


