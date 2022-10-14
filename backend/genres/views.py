from rest_framework.viewsets import ModelViewSet
from .models import Genre
from .serializers import GenreSerializer


class GenreViewSet(ModelViewSet):
    """
    A viewset for viewing and editing music genres
    """
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
