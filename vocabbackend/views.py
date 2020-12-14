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
from .utils import get_syn_id, get_list_of_definitions_cambridge
from rest_framework.decorators import api_view


class VocabAPI(viewsets.ModelViewSet):
    serializer_class = VocabSerializer
    permission_classes = [IsAuthenticated,]

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

    def destroy(self, request, pk):
        vocab_to_be_deleted = Vocab.objects.get(pk=pk)
        vocab_to_be_deleted.delete()
        
        queryset = self.request.user.memorizedWords.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetDefinitionAPICambridge(generics.GenericAPIView):

    def get(self, request, word):
        if (Vocab.objects.get(word__iexact=word)):
            list_of_definitions = get_list_of_definitions_cambridge(word)
            return Response(list_of_definitions)




    


"""
@api_view(['GET'])
def get_definitions(request, word):
    definition_list = get_list_of_definitions(word)
    return Response(definition_list)
"""





