from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    #profilePic = models.ImageField(upload_to="profilepictures")
    #do this later and get the pillow library 
    #instruction https://www.geeksforgeeks.org/imagefield-django-models/
    pass


class Vocab(models.Model):
    word = models.CharField(max_length=45)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,  related_name="memorizedWords")
    memorizedOn = models.DateField(auto_now_add=True, null=True, blank=True)
    meaning = models.TextField()
    synonyms = models.ManyToManyField("self",  blank=True)

    def __str__(self):
        return f"{self.word}"



