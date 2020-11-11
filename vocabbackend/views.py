from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vocab
from .serializers import VocabSerializer, AddNewVocab
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import generics
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .utils import get_syn_id



class VocabAPI(viewsets.ModelViewSet):
    serializer_class = VocabSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        return self.request.user.memorizedWords.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        word = data["word"]
        meaning = data["meaning"]
        synonyms = get_syn_id(data["synonyms"])
        user = self.request.user

        serializer = AddNewVocab(data={"word": word, "meaning": meaning, "synonyms": synonyms, "owner": user.id})
        serializer.is_valid(raise_exception=True)
        new_vocab = serializer.save()


        return Response(VocabSerializer(new_vocab).data)




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



