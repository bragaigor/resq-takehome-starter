from django.urls import include, path
from rest_framework import routers
from django.conf.urls import url 

from . import views

router = routers.DefaultRouter()
router.register(r'workorders', views.WorkOrderViewSet)

urlpatterns = [
    # <int:id> Allow url to pass id
    path("<int:id>", views.index, name="index"),
    path('getall/', include(router.urls)),
    url(r'title/(?P<name>.*)', views.findTitle), # GET and POST request to get and update work orders by title
    url(r'facility/(?P<name>.*)', views.findFacility), # GET and POST request to get and update work orders by facility
    url(r'newWork', views.newWork), # POST request to insert new Work Order
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]