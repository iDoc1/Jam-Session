from rest_framework.viewsets import ModelViewSet
from .models import Comment, Post
from .serializers import CommentSerializer, PostSerializer


class CommentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Comment instances
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    http_method_names = ['get', 'post', 'patch', 'delete']


class PostViewSet(ModelViewSet):
    """
    A viewset for viewing and editing Post instances
    """
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    http_method_names = ['get', 'post', 'patch', 'delete']
