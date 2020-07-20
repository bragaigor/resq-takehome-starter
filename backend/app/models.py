from django.db import models

class Question(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    facility = models.CharField(max_length=100)
    state = models.CharField(max_length=50)