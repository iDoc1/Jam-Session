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


class Gender(models.Model):
    """
    Gender options for users to enter when creating a profile
    """
    gender = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.gender


class CommitmentLevel(models.Model):
    """
    Commitment levels a user can have
    """
    level = models.CharField(max_length=30, unique=True)
    rank = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return self.level


class UserProfile(models.Model):
    """
    Profile details for a specific UserAccount
    """
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=75, blank=True, default='')
    last_name = models.CharField(max_length=75, blank=True, default='')
    gender = models.ForeignKey(Gender, blank=True, null=True, on_delete=models.SET_NULL)
    birth_date = models.DateField(null=True)
    zipcode = models.CharField(max_length=10, blank=True, default='')
    profile_picture_url = models.URLField(null=True, blank=True)
    join_date = models.DateTimeField(default=timezone.now)
    years_playing = models.SmallIntegerField(default=0)
    level_of_commitment = models.ForeignKey(CommitmentLevel, blank=True, null=True, on_delete=models.SET_NULL)
    seeking = models.TextField(blank=True, default='')
    instruments = models.ManyToManyField(Instrument, blank=True, through='UserInstrument')
    genres = models.ManyToManyField(Genre, blank=True)

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return str(self.user) + " " + self.get_full_name()


class ExperienceLevel(models.Model):
    """
    Experience level types a user can have with an instrument
    """
    level = models.CharField(max_length=30, unique=True)
    rank = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return self.level


class UserInstrument(models.Model):
    """
    Instrument and experience level for a specific UserProfile
    """
    user_profile = models.ForeignKey(UserProfile, related_name='userinstruments', on_delete=models.CASCADE)
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    experience_level = models.ForeignKey(ExperienceLevel, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.user_profile.get_full_name() + " " + str(self.instrument)
