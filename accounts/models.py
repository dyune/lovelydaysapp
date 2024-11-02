from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'  # username shall be an email field
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)  # emails are unique identifiers

    def __str__(self):
        return self.email
