from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    ExperienceLevelViewSet,
    UserInstrumentViewSet, 
    GenderViewSet, 
    # UserProfileView, 
    UserProfileViewSet,
    CommitmentLevelViewSet
)


# urlpatterns = [
#     path('profiles/me', UserProfileView.as_view())
# ]

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profiles')
router.register(r'experience-levels', ExperienceLevelViewSet)
router.register(r'genders', GenderViewSet)
router.register(r'commitment-levels', CommitmentLevelViewSet)

urlpatterns = router.urls
