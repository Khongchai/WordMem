from django.db import models
from django.contrib.auth.models import AbstractUser

def upload_path(instance, filename):
    #returns a concatenated relative path that uses relevant information as its path
    return '/'.join(["profile_images", str(instance.username), filename])


class User(AbstractUser):
    #profilePic = models.ImageField(upload_to="profilepictures")
    #do this later and get the pillow library 
    #instruction https://www.geeksforgeeks.org/imagefield-django-models/
    prof_img = models.ImageField(null=True, blank=True, upload_to=upload_path)
    


class Vocab(models.Model):
    word = models.CharField(max_length=45)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,  related_name="memorizedWords")
    memorizedOn = models.DateField(auto_now_add=True, null=True, blank=True)
    meaning = models.TextField()
    synonyms = models.ManyToManyField("self",  blank=True)

    def __str__(self):
        return f"{self.word}"



