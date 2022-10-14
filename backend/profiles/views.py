from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from accounts.models import UserAccount
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
    serializer_class = UserProfileSerializer
    http_method_names = ['get', 'put', 'patch']  # Only account can be deleted, not profile
    
    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(user=user)

