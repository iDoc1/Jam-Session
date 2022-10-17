from rest_framework.routers import DefaultRouter
from .views import (
    ExperienceLevelViewSet,
    GenderViewSet,
    UserProfileViewSet,
    CommitmentLevelViewSet
)

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profiles')
router.register(r'experience-levels', ExperienceLevelViewSet)
router.register(r'genders', GenderViewSet)
router.register(r'commitment-levels', CommitmentLevelViewSet)

urlpatterns = router.urls
