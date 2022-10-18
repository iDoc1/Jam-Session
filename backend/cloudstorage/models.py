import datetime
from django.db import models
from backend.settings import AUTH_USER_MODEL


class ProfilePicture(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)
    image_file = models.FileField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    def save(self, *args, **kwargs):
        if self.image_file:
            self.image_file.name = self.user.email + "_profile_pic_" + self.image_file.name
        super(ProfilePicture, self).save(*args, **kwargs)
