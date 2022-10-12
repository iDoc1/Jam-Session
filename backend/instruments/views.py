from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Instrument
from .serializers import InstrumentSerializer

class InstrumentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Instrument instances
    """
    serializer_class = InstrumentSerializer  # TODO: Is this necessary?
    queryset = Instrument.objects.all()
