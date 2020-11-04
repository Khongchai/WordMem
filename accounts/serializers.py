from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from vocabbackend.models import Vocab

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

#register a user and then return the user's info
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username_ignore_case = User.objects.get(username__iexact=data["username"])
        user = authenticate(username=username_ignore_case, password=data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
