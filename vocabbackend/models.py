from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Vocab(models.Model):
    word = models.CharField(max_length=45)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,  related_name="memorizedWords")
    memorizedOn = models.DateField(auto_now_add=True, null=True, blank=True)
    meaning = models.TextField()
    synonyms = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.word} // {self.memorizedOn.strftime('%#d %b %Y, %#I:%M %p')}"



