from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework import viewsets
from .models import WorkOrder
from .serializers import WorkOrderSerializer
from rest_framework.decorators import api_view

# Create your views here.
def index(repsonse, id):
    workItem = WorkOrder.objects.get(id=id)
    return HttpResponse("<h1>Hello from the App!!! id: title: %s</h1>" % workItem.title)

@api_view(['GET', 'POST', 'DELETE'])
def findFacility(repsonse, name):
    print("Im inside facility!!! and name: " + str(name))
    if repsonse.method == 'GET':
        workItemFilter = WorkOrder.objects.filter(facility__icontains=name)
        print("len of workItemFilter: " + str(len(workItemFilter)))
        if (len(workItemFilter) != 0):
            workOrderList = []
            for i in range(len(workItemFilter)):
                workOrderSerial = WorkOrderSerializer(workItemFilter[i])
                workOrderList.append(workOrderSerial.data)
            print(workOrderSerial.data)
            returnData = {}
            returnData["data"] = workOrderList
            return JsonResponse(returnData) # Is this JSON data???
        else:
            return JsonResponse({'message': 'The work order does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    # POST request to update by facility name
    elif repsonse.method == 'POST':
        workItemFilter = WorkOrder.objects.filter(facility__icontains=name)
        print("Inside POST request for findTitle")
        if (len(workItemFilter) == 1):
            thisWorkOrder = workItemFilter[0]
            workOrder_data = JSONParser().parse(repsonse)
            print(workOrder_data)
            workOrderRequest = WorkOrderSerializer(data=workOrder_data) 
            if workOrderRequest.is_valid():
                thisWorkOrder.title = workOrderRequest.data["title"]
                thisWorkOrder.description = workOrderRequest.data["description"]
                thisWorkOrder.save()
                workOrderSerial = WorkOrderSerializer(thisWorkOrder)
                return JsonResponse(workOrderSerial.data, status=status.HTTP_201_CREATED)
            return JsonResponse(workOrderRequest.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'message': 'The work order does not exist or duplicate found'}, status=status.HTTP_404_NOT_FOUND) 

@api_view(['GET', 'POST', 'DELETE'])
def findTitle(repsonse, name):
    print("Im inside here!!! and name: " + str(name))
    if repsonse.method == 'GET':
        workItemFilter = WorkOrder.objects.filter(title__icontains=name)
        print("len of workItemFilter: " + str(len(workItemFilter)))
        if (len(workItemFilter) != 0):
            workOrderList = []
            for i in range(len(workItemFilter)):
                workOrderSerial = WorkOrderSerializer(workItemFilter[i])
                workOrderList.append(workOrderSerial.data)
            workOrderSerial = WorkOrderSerializer(workItemFilter[0])
            print(workOrderSerial.data)
            returnData = {}
            returnData["data"] = workOrderList
            return JsonResponse(returnData) # Is this JSON data???
        else:
            return JsonResponse({'message': 'The work order does not exist'}, status=status.HTTP_404_NOT_FOUND)
    # POST request to update by title
    elif repsonse.method == 'POST':
        workItemFilter = WorkOrder.objects.filter(title__icontains=name)
        print("Inside POST request for findTitle")
        if (len(workItemFilter) == 1):
            thisWorkOrder = workItemFilter[0]
            workOrder_data = JSONParser().parse(repsonse)
            print(workOrder_data)
            workOrderRequest = WorkOrderSerializer(data=workOrder_data) 
            if workOrderRequest.is_valid():
                thisWorkOrder.title = workOrderRequest.data["title"]
                thisWorkOrder.description = workOrderRequest.data["description"]
                thisWorkOrder.save()
                workOrderSerial = WorkOrderSerializer(thisWorkOrder)
                return JsonResponse(workOrderSerial.data, status=status.HTTP_201_CREATED)
            return JsonResponse(workOrderRequest.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'message': 'The work order does not exist or duplicate found'}, status=status.HTTP_404_NOT_FOUND) 

@api_view(['POST'])
def newWork(repsonse):
    if repsonse.method == 'POST':
        print("Inside POST request for newWork")
        workOrder_data = JSONParser().parse(repsonse)
        print(workOrder_data)
        workOrderSerial = WorkOrderSerializer(data=workOrder_data) 
        if workOrderSerial.is_valid(): 
            workOrderSerial.save() 
            return JsonResponse(workOrderSerial.data, status=status.HTTP_201_CREATED)
        return JsonResponse(workOrderSerial.errors, status=status.HTTP_400_BAD_REQUEST)

# TODO:
@api_view(['GET', 'PUT', 'DELETE'])
def deleteWorkItem(response, name):
    workItemFilter = WorkOrder.objects.filter(title__startswith=name)
    if (len(workItemFilter) != 0):
        toDeleteWorkItem = workItemFilter[0]
        header2 = "<h2>About to be deleted: " + str(workItemFilter[0].facility) + "</h2>"
        toDeleteWorkItem.delete()

    return HttpResponse(header1 + header2)

class WorkOrderViewSet(viewsets.ModelViewSet):
    queryset = WorkOrder.objects.all().order_by('title')
    serializer_class = WorkOrderSerializer