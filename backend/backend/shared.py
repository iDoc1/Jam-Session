"""
This file stores classes and/or function that are shared with other apps in this project
"""
from django.db import models


class LowerCaseCharField(models.CharField):
    """
    This class extends CharField to convert strings to lowercase prior to saving to the
    database. This class was adapted from the following source:
    https://stackoverflow.com/questions/36330677/django-model-set-default-charfield-in-lowercase
    """
    def __init__(self, *args, **kwargs) -> None:
        super(LowerCaseCharField, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        return str(value).lower()
