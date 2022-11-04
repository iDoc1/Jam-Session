from rest_framework.exceptions import ValidationError
from rest_framework.viewsets import ModelViewSet
from genres.models import Genre
from instruments.models import Instrument
from .models import Comment, Post
from .serializers import CommentSerializer, PostSerializer
from .zipcode_lookup import ZipCodeLookup


class CommentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Comment instances
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    http_method_names = ['get', 'post', 'patch', 'delete']


class PostViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Post instances
    """
    serializer_class = PostSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        """
        Accepts filters for seeking, instrument, genre, and zipcode radius.
        """
        queryset = Post.objects.all()

        # If the get request has query params then return specified query
        if self.request.method == 'GET' and len(self.request.query_params) != 0:
            seeking = self.request.query_params.get('seeking')
            instrument = self.request.query_params.get('instrument')
            genre = self.request.query_params.get('genre')
            zipcode = self.request.query_params.get('zipcode')
            radius = self.request.query_params.get('radius')

            # Return error if zipcode and radius are invalid
            self._validate_zipcode(zipcode, radius)

            queryset = self._filter_by_zipcode_radius(queryset, zipcode, radius)

            if seeking is not None:
                queryset = queryset.filter(seeking=seeking)

            if instrument is not None:
                try:
                    instrument = Instrument.objects.get(name=instrument)
                    queryset = queryset.filter(instruments__in=[instrument])
                except Instrument.DoesNotExist:
                    return []

            if genre is not None:
                try:
                    genre = Genre.objects.get(genre=genre)
                    queryset = queryset.filter(genres__in=[genre])
                except Genre.DoesNotExist:
                    return []

        elif self.request.method == 'GET' and self.kwargs.get('pk') is None:
            raise ValidationError({'detail': 'GET requests must have either query params or a key specified in URL'})

        return queryset

    def _filter_by_zipcode_radius(self, queryset, zipcode, radius):
        """
        Filters the given queryset by the
        """
        zipcode_lookup = ZipCodeLookup(zipcode)
        zipcodes_in_radius = zipcode_lookup.get_zipcodes_in_radius(int(radius))
        queryset = queryset.filter(zipcode__in=zipcodes_in_radius)
        return queryset

    def _validate_zipcode(self, zipcode, radius):
        """
        Returns an error Response if the zipcde and radius are invalid. Otherwise,
        returns None.
        """
        if not zipcode and not radius:
            raise ValidationError({'detail': 'zipcode and radius are required parameters'})

        # Return error if either zipcode or radius specified but other is missing
        if zipcode and not radius:
            raise ValidationError({'detail': 'radius parameter is missing'})

        if radius and not zipcode:
            raise ValidationError({'detail': 'zipcode parameter is missing'})

        # Check if radius is a number
        if not radius.isdigit():
            raise ValidationError({'detail': 'radius must be a positive integer'})

        # Check if provided zipcode is 5 digits long
        if len(zipcode) != 5:
            raise ValidationError({'detail': 'zipcode must be 5 digits long'})

        # Check if provided zipcode exists
        zipcode_lookup = ZipCodeLookup(zipcode)
        if not zipcode_lookup.zipcode_exists():
            raise ValidationError({'detail': 'zipcode does not exist'})
