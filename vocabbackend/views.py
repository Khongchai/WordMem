from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vocab
from .serializers import VocabSerializer, AddNewVocab
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from rest_framework import generics
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .utils import get_syn_id, get_list_of_definitions
from rest_framework.decorators import api_view
import base64


class VocabAPI(viewsets.ModelViewSet):
    serializer_class = VocabSerializer
    permission_classes = [IsAuthenticated,]
    lookup_field = "word"

    def list(self, request):
        queryset = self.request.user.memorizedWords.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data
        word = data["word"]
        meaning = data["meaning"]
        synonyms = get_syn_id(data["synonyms"])
        user = self.request.user

        serializer = AddNewVocab(data={"word": word, "meaning": meaning, "synonyms": synonyms, "owner": user.id})
        serializer.is_valid(raise_exception=True)
        new_vocab = serializer.save()

        queryset = self.request.user.memorizedWords.all()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    def destroy(self, request, word):
        
        vocab_to_be_deleted = Vocab.objects.get(word__iexact=word, owner=self.request.user)
        vocab_to_be_deleted.delete()
        
        queryset = self.request.user.memorizedWords.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetDefinitionAPICambridge(generics.GenericAPIView):

    def get(self, request, word):
        #When empty, returns empty array; show error in frontend.
        list_of_definitions = get_list_of_definitions(word, "cambridge")
        return Response(list_of_definitions)


class GetDefinitionAPIOxford(generics.GenericAPIView):

    def get(self, request, word):
        #When empty, returns empty array; show error in frontend.
        list_of_definitions = get_list_of_definitions(word, "oxford")
        return Response(list_of_definitions)
            
class ManageUserProfilePic(generics.GenericAPIView):

    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        user.prof_img = request.data["newProfImg"]
        user.save()
        return Response(status=200)

    def get(self, request):
        user = self.request.user
        if user.prof_img:
            return HttpResponse(user.prof_img, content_type="image/png")
        else:
            return Response(status=204)



