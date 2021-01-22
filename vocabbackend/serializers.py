from rest_framework import serializers
from .models import Vocab
from .utils import get_syn_id
from django.contrib.auth import get_user_model

User = get_user_model()

class VocabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vocab
        fields = "__all__"

class AddNewVocab(serializers.ModelSerializer):
    class Meta:
        model = Vocab
        
        #this field says how many and what arguments are accepted to this class
        fields = "__all__"

    def create(self, validated_data):
        
        #get list of synonym ids, get synonyms out, then combine together in the new vocab obj
        synonyms_id = get_syn_id(validated_data["synonyms"])
        validated_data.pop("synonyms")

        vocab = Vocab.objects.create(**validated_data)
        vocab.synonyms.add(*synonyms_id)

        return vocab

    


        