from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import ProfilePicture, MusicSample
from .serializers import ProfilePictureSerializer, MusicSampleSerializer


class ProfilePictureViewSet(ModelViewSet):
    """
    Viewset to create and modify users' ProfilePicture
    """
    serializer_class = ProfilePictureSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        """
        Returns the ProfilePicture associated with the currently authenticated user
        """
        user = self.request.user
        return ProfilePicture.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        """
        Create ProfilePicture for currently authenticated user
        """
        pic_exists_response = self._verify_profile_pic_not_exists(request)
        if pic_exists_response is not None:
            return pic_exists_response

        validate_file_response = validate_request_file(request, 'image_file')
        if validate_file_response is not None:
            return validate_file_response

        return super(ProfilePictureViewSet, self).create(request, *args, **kwargs)

    def _verify_profile_pic_not_exists(self, request):
        """
        Checks if the currently authenticated user already has a profile picture
        """
        profile_pic_exists = ProfilePicture.objects.filter(user=request.user).exists()
        if profile_pic_exists:
            return Response({'detail': 'User already has a profile picture'}, status=400)

    def list(self, request, *args, **kwargs):
        """
        Returns a single ProfilePicture when a list is requested
        """
        user = request.user
        profile = ProfilePicture.objects.filter(user=user)

        if len(profile) > 0:
            profile = ProfilePicture.objects.get(user=user)
            serializer = ProfilePictureSerializer(profile)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not found.'}, status=404)

    def update(self, request, *args, **kwargs):
        """
        Deletes existing file before adding a new one
        """
        pic_exists_response = self._validate_profile_pic_exists(**kwargs)
        if pic_exists_response is not None:
            return pic_exists_response

        file_is_valid_response = validate_request_file(request, 'image_file')
        if file_is_valid_response is not None:
            return file_is_valid_response

        profile = ProfilePicture.objects.get(user=request.user)
        profile.image_file.delete()
        return super(ProfilePictureViewSet, self).update(request, *args, **kwargs)

    def _validate_profile_pic_exists(self, **kwargs):
        """
        Validates that the path parameter id is an existing object
        """
        id = kwargs['pk']
        if not ProfilePicture.objects.filter(id=id).exists():
            return Response({'detail': 'The specified profile picture does not exist'}, status=404)


class MusicSampleViewSet(ModelViewSet):
    """
    Viewset to create and modify music samples
    """
    serializer_class = MusicSampleSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        """
        Returns the MusicSamples associated with the currently authenticated user
        """
        user = self.request.user
        return MusicSample.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        """
        Create MusicSample for currently authenticated user
        """
        validate_file_response = validate_request_file(request, 'music_file')
        if validate_file_response is not None:
            return validate_file_response

        return super(MusicSampleViewSet, self).create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """
        Deletes existing file before adding a new one
        """
        sample_exists_response = self._validate_music_sample_exists(**kwargs)
        if sample_exists_response is not None:
            return sample_exists_response

        file_is_valid_response = validate_request_file(request, 'music_file')
        if file_is_valid_response is not None:
            return file_is_valid_response

        sample = MusicSample.objects.get(user=request.user, id=kwargs['pk'])
        sample.music_file.delete()
        return super(MusicSampleViewSet, self).update(request, *args, **kwargs)

    def _validate_music_sample_exists(self, **kwargs):
        """
        Validates that the path parameter id is an existing object
        """
        id = kwargs['pk']
        if not MusicSample.objects.filter(id=id).exists():
            return Response({'detail': 'The specified music sample does not exist'}, status=404)


def validate_request_file(request, field_name):
    """
    Validates the request file in the request
    """
    if not validate_file_exists(request, field_name):
        return Response({'detail': 'File not found in the request'}, status=400)

    if not validate_file_size(request, field_name):
        return Response({'detail': 'File size must be smaller than 2.5MB'}, status=400)

def validate_file_exists(request, field_name):
    """
    Validates that a file exists
    """
    file_exists = request.FILES.get(field_name, False)
    return file_exists

def validate_file_size(request, field_name):
    """
    Validates that file is less than 2MB
    """
    file_size = request.FILES[field_name].size
    return file_size < 2500000
