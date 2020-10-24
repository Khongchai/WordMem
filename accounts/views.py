from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from knox.auth import TokenAuthentication

#Register API
#TODO log the user in after registration
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_serializer = UserSerializer(user)

        return Response({
            "user": user_serializer.data,
            "token": AuthToken.objects.create(user)[1]
        })




#can do serializer.save(owner = request.user)

