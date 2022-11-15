from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import (
    ExperienceLevel,
    UserInstrument,
    UserProfile,
    Gender,
    CommitmentLevel,
    SocialMediaLink
)
from .serializers import (
    ExperienceLevelSerializer,
    UserInstrumentSerializer,
    UserProfileSerializer,
    GenderSerializer,
    CommitmentLevelSerializer,
    SocialMediaLinkSerializer,
    PublicUserProfileSerializer
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


class SocialMediaLinkViewSet(ModelViewSet):
    """
    A viewset for viewing and editing a user's social media links
    """
    serializer_class = SocialMediaLinkSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        """
        Returns the SocialMediaLinks associated with the current user
        """
        user = self.request.user
        return SocialMediaLink.objects.filter(user=user)


class UserProfileViewSet(ModelViewSet):
    """
    A viewset for viewing and editing UserProfile instances
    """
    serializer_class = UserProfileSerializer

    # PUT not allowed since only some fields of UserProfile allowed to be updated
    http_method_names = ['get', 'patch']

    def get_queryset(self):
        """
        Returns the UserProfile associated with the currently authenticated user
        """
        user = self.request.user
        return UserProfile.objects.filter(user=user)

    def retrieve(self, request, *args, **kwargs):
        """
        If the requesting user and the requested profile match, then returns the entire
        UserProfile. If the user and requested profile do not match, returns only the
        fields that are publicly available.
        """
        user = request.user
        requested_profile_id = int(kwargs.get('pk'))
        profile = UserProfile.objects.get(user=user)

        if profile.id == requested_profile_id:
            serializer = UserProfileSerializer(profile)
        else:
            try:
                profile = UserProfile.objects.get(id=requested_profile_id)
            except UserProfile.DoesNotExist:
                return Response({'detail': 'requested profile does not exist'}, status=404)

            serializer = PublicUserProfileSerializer(profile)

        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        """
        Returns a single UserProfile when a list is requested
        """
        user = request.user
        profile = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """
        Prevent unauthorized user from updating another user's profile
        """
        user = request.user
        requested_profile_id = int(kwargs.get('pk'))
        profile = UserProfile.objects.get(user=user)

        if profile.id != requested_profile_id:
            return Response({'detail': 'requestor is not authorized to edit profile that is not their own'}, status=401)

        return super().update(request, *args, **kwargs)
