from rest_framework.routers import DefaultRouter
from .views import InstrumentViewSet


router = DefaultRouter()
router.register(r'instruments', InstrumentViewSet)

urlpatterns = router.urls
