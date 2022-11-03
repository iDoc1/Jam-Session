from rest_framework.routers import DefaultRouter
from .views import ProfilePictureViewSet, MusicSampleViewSet

router = DefaultRouter()
router.register(r'profile-pics', ProfilePictureViewSet, basename='profile-pics')
router.register(r'music-samples', MusicSampleViewSet, basename='music-samples')

urlpatterns = router.urls
