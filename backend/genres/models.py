from django.db import models
from backend.shared import LowerCaseCharField


class Genre(models.Model):
    """
    The name of a specific music genre that a user can prefer
    """
    genre = LowerCaseCharField(max_length=50, unique=True)

    def __str__(self):
        return self.genre
