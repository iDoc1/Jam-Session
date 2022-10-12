from django.db import models


class Genre(models.Model):
    """
    The name of a specific music genre that a user can prefer
    """
    genre = models.CharField(max_length=50)

    def __str__(self):
        return self.genre
