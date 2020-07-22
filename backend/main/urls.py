from django.urls import path

from . import views

urlpatterns = [
    # <int:id> Allow url to pass id
    path("<int:id>", views.index, name="index"),
    path("facility/<str:name>", views.findFacility, name="get Facility"),
    path("title/<str:name>", views.findTitle, name="get Facility"),
]