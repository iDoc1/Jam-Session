from django.db import models
from backend.settings import AUTH_USER_MODEL
from genres.models import Genre
from instruments.models import Instrument


class Post(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    seeking = models.CharField(max_length=50)
    content = models.TextField(null=True)
    zipcode = models.CharField(max_length=10)
    posted_date = models.DateTimeField(auto_now=True)
    instruments = models.ManyToManyField(Instrument)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return str(self.user) + " " + self.title


class Comment(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, related_name='comment', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comment', on_delete=models.CASCADE)
    content = models.TextField()
    comment_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Comment: " + str(self.post)
