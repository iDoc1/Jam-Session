from django.db.models.signals import post_delete
from django.dispatch import receiver
from cloudstorage.models import ProfilePicture, MusicSample


@receiver(post_delete, sender=ProfilePicture)
def delete_profile_picture_file(sender, instance, using, **kwargs):
    """
    Deletes the profile picture file after the ProfilePicture object is deleted
    """
    instance.image_file.delete(save=False)


@receiver(post_delete, sender=MusicSample)
def delete_music_sample_file(sender, instance, using, **kwargs):
    """
    Deletes the music sample file after the MusicSample object is deleted
    """
    instance.music_file.delete(save=False)
