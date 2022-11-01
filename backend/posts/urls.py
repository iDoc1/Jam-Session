from rest_framework.routers import DefaultRouter
from .views import CommentViewSet, PostViewSet

router = DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'posts', PostViewSet)

urlpatterns = router.urls
