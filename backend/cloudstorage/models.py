import datetime
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone
from backend.settings import AUTH_USER_MODEL


class ProfilePicture(models.Model):
    """
    Represents a profile picture tied to a specific UserAccount
    """
    user = models.OneToOneField(AUTH_USER_MODEL, related_name='profile_pic', on_delete=models.CASCADE)
    image_file = models.FileField(validators=[FileExtensionValidator(['jpg', 'jpeg', 'gif', 'png', 'bmp'])])
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    def save(self, *args, **kwargs):
        """
        Saves the image file with a unique file name and current timestamp
        """
        if self.image_file:
            curr_datetime = str(datetime.datetime.now())
            file_extension = self.image_file.name.split('.')[-1]
            self.image_file.name = self.user.email + "_profile_" + curr_datetime + "." + file_extension
            self.created_date = timezone.now()

        super(ProfilePicture, self).save(*args, **kwargs)


class MusicSample(models.Model):
    """
    Represents a music sample tied to a specific UserAccount
    """
    user = models.ForeignKey(AUTH_USER_MODEL, related_name='music_sample', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    music_file = models.FileField(
        validators=[FileExtensionValidator(['mp3', 'aac', 'ogg', 'wma'])]  # Compressed types only
    )
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user) + " " + self.title

    def save(self, *args, **kwargs):
        """
        Saves the music file with a unique file name and current timestamp
        """
        if self.music_file:
            curr_datetime = str(datetime.datetime.now())
            file_extension = self.music_file.name.split('.')[-1]
            self.music_file.name = self.user.email + "_music_" + curr_datetime + "." + file_extension
            self.created_date = timezone.now()

        super(MusicSample, self).save(*args, **kwargs)
