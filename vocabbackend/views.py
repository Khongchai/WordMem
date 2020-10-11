from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
#from .serializers import TaskSerializer
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import generics


@api_view(["GET"])
def apiOverview(request):
    #this view returns list of all available APIs.
    api_urls = {
        "List": '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create':'/task-create/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>',
    }
    return Response(api_urls)