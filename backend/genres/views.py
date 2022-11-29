from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from .models import Genre
from .serializers import GenreSerializer


class GenreViewSet(ModelViewSet):
    """
    A viewset for viewing and editing music genres
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = GenreSerializer
    queryset = Genre.objects.order_by('genre')  # Sort alphabetically
