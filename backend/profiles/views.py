from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import ExperienceLevel, UserInstrument, UserProfile, Gender, CommitmentLevel
from .serializers import (
    ExperienceLevelSerializer,
    UserInstrumentSerializer,
    UserProfileSerializer,
    GenderSerializer,
    CommitmentLevelSerializer
)


class ExperienceLevelViewSet(ModelViewSet):
    """
    A viewset for viewing and editing ExperienceLevel instances
    """
    serializer_class = ExperienceLevelSerializer
    queryset = ExperienceLevel.objects.all()


class UserInstrumentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing UserExperienceLevel instances
    """
    serializer_class = UserInstrumentSerializer
    queryset = UserInstrument.objects.all()


class GenderViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Gender instances
    """
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()


class CommitmentLevelViewSet(ModelViewSet):
    """
    A viewset for viewing and editing CommitmentLevel instances
    """
    serializer_class = CommitmentLevelSerializer
    queryset = CommitmentLevel.objects.all()


class UserProfileViewSet(ModelViewSet):
    """
    A viewset for viewing and editing UserProfile instances
    """
    serializer_class = UserProfileSerializer

    # PUT not allowed since only some fields of UserProfile alloed to be updated
    http_method_names = ['get', 'patch']

    def get_queryset(self):
        """
        Returns the UserProfile associated with the currently authenticated user
        """
        user = self.request.user
        return UserProfile.objects.filter(user=user)

    def list(self, request, *args, **kwargs):
        """
        Returns a single UserProfile when a list is requested
        """
        user = request.user
        profile = UserProfile.objects.get(id=user.id)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
