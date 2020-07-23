from django.db import models

# Create your models here.
class SimpleClass(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return "Name " + str(self.name)

class WorkOrder(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    facility = models.CharField(max_length=100)
    state = models.CharField(max_length=20)

    def __str__(self):
        return "Title " + str(self.title) + ", facility: " + str(self.facility)