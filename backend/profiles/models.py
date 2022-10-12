from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.db import models
from django.utils import timezone
from backend.settings import AUTH_USER_MODEL
from instruments.models import Instrument
from genres.models import Genre


def get_date_18_years_ago():
    """
    Returns the date object representing 18 years ago today. To be used as the default
    birth date in UserProfile.
    """
    eighteen_years_ago = datetime.now() - relativedelta(years=18)
    return eighteen_years_ago.date()


class UserProfile(models.Model):
    """
    Profile details for a specific UserAccount
    """
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=75, default='')
    last_name = models.CharField(max_length=75, default='')
    gender = models.CharField(max_length=30, default='')
    birth_date = models.DateField(default=get_date_18_years_ago)
    zipcode = models.CharField(max_length=10, default='')
    profile_picture_url = models.URLField(null=True, blank=True)
    join_date = models.DateTimeField(default=timezone.now)
    years_playing = models.SmallIntegerField(default=0)
    level_of_commitment = models.CharField(max_length=75, default='')
    seeking = models.TextField(default='')
    instruments = models.ManyToManyField(Instrument, through='UserExperienceLevel')
    genres = models.ManyToManyField(Genre)

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return str(self.user) + " " + self.get_full_name()


class UserExperienceLevel(models.Model):
    """
    Instrument and experience level for a specific UserProfile
    """
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    experience_level = models.CharField(max_length=30)

    def __str__(self):
        return self.user_profile.get_full_name() + " " + str(self.instrument)

