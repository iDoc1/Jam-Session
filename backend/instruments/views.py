from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from .models import Instrument
from .serializers import InstrumentSerializer


class InstrumentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Instrument instances
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = InstrumentSerializer
    queryset = Instrument.objects.all()
