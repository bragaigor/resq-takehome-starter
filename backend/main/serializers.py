from rest_framework import serializers

from .models import WorkOrder

class WorkOrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkOrder
        fields = ('title', 'description', 'facility', 'state')