from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProfilePictureViewSet

router = DefaultRouter()
router.register(r'profile-pics', ProfilePictureViewSet, basename='profile-pics')

urlpatterns = router.urls
