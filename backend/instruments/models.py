from django.db import models
from backend.shared import LowerCaseCharField


class Instrument(models.Model):
    """
    The name of a specific instrument that a User can play
    """
    name = LowerCaseCharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
