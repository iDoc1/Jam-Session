from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import ProfilePicture
from .serializers import ProfilePictureSerializer


class ProfilePictureViewSet(ModelViewSet):
    serializer_class = ProfilePictureSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        """
        Returns the ProfilePicture associated with the currently authenticated user
        """
        user = self.request.user
        return ProfilePicture.objects.filter(user=user)

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
        user = request.user
        profile = ProfilePicture.objects.get(user=user)
        profile.image_file.delete()
        return super(ProfilePictureViewSet, self).update(request, *args, **kwargs)




