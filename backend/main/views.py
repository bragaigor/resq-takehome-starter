from django.shortcuts import render
from django.http import HttpResponse
from .models import WorkOrder

# Create your views here.
def index(repsonse, id):
    workItem = WorkOrder.objects.get(id=id)
    return HttpResponse("<h1>Hello from the App!!! id: title: %s</h1>" % workItem.title)

def findFacility(repsonse, name):
    workItemFilter = WorkOrder.objects.filter(facility__startswith=name)
    header1 = "<h1>Looking for facility: " + str(name) + "</h1>"
    header2 =  "<h2>Facility not found!</h2>"
    if (len(workItemFilter) != 0):
        header2 = "<h2>Found facility with title: " + str(workItemFilter[0].title) + "</h2>"
    return HttpResponse(header1 + header2)

# TODO: return JSON
def findTitle(repsonse, name):
    workItemFilter = WorkOrder.objects.filter(title__startswith=name)
    print("len of workItemFilter: " + str(len(workItemFilter)))
    header1 = "<h1>Looking for title: " + str(name) + "</h1>"
    header2 =  "<h2>Title not found!</h2>"
    if (len(workItemFilter) != 0):
        header2 = "<h2>Found title with facility: " + str(workItemFilter[0].facility) + "</h2>"
    return HttpResponse(header1 + header2)

def deleteWorkItem(response, name):
    workItemFilter = WorkOrder.objects.filter(title__startswith=name)
    if (len(workItemFilter) != 0):
        toDeleteWorkItem = workItemFilter[0]
        header2 = "<h2>About to be deleted: " + str(workItemFilter[0].facility) + "</h2>"
        toDeleteWorkItem.delete()

    return HttpResponse(header1 + header2)