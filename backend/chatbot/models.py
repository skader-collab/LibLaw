from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

