from rest_framework.routers import DefaultRouter
from .views import (
    ExperienceLevelViewSet,
    GenderViewSet,
    UserProfileViewSet,
    CommitmentLevelViewSet,
    SocialMediaLinkViewSet
)

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profiles')
router.register(r'experience-levels', ExperienceLevelViewSet)
router.register(r'genders', GenderViewSet)
router.register(r'commitment-levels', CommitmentLevelViewSet)
router.register(r'social-media', SocialMediaLinkViewSet, basename='socail-media')

urlpatterns = router.urls
