from rest_framework.viewsets import ModelViewSet
from .models import Instrument
from .serializers import InstrumentSerializer


class InstrumentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Instrument instances
    """
    serializer_class = InstrumentSerializer
    queryset = Instrument.objects.all()
