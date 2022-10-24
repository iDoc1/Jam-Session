from django.db import models
from django.utils import timezone
from backend.settings import AUTH_USER_MODEL
from genres.models import Genre
from instruments.models import Instrument


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
    user = models.OneToOneField(AUTH_USER_MODEL, related_name='user_profile', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=75, blank=True, default='')
    last_name = models.CharField(max_length=75, blank=True, default='')
    gender = models.ForeignKey(Gender, blank=True, null=True, on_delete=models.SET_NULL)
    birth_date = models.DateField(null=True)
    zipcode = models.CharField(max_length=10, blank=True, default='')
    join_date = models.DateTimeField(auto_now=True)
    years_playing = models.SmallIntegerField(default=0)
    level_of_commitment = models.ForeignKey(CommitmentLevel, blank=True, null=True, on_delete=models.SET_NULL)
    seeking = models.TextField(blank=True, default='')
    instruments = models.ManyToManyField(Instrument, blank=True, through='UserInstrument')
    genres = models.ManyToManyField(Genre, blank=True)

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_age(self):
        if self.birth_date:
            return get_year_diff(self.birth_date, timezone.now())

    def __str__(self):
        return str(self.user) + " " + self.get_full_name()


def get_year_diff(start_date, end_date):
        """
        Returns number of years from start date to end date
        """
        if (end_date.month, end_date.day) < (start_date.month, start_date.day):
            return end_date.year - start_date.year - 1
        else:
            return end_date.year - start_date.year


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


class SocialMediaLink(models.Model):
    """
    Social media link for a specific UserProfile
    """
    user = models.ForeignKey(AUTH_USER_MODEL, related_name='social_media', on_delete=models.CASCADE)
    social_media_site = models.CharField(max_length=100)
    social_media_link = models.URLField()
