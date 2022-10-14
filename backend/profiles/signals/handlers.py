from accounts.models import UserAccount
from django.db.models.signals import post_save
from django.dispatch import receiver
from profiles.models import UserProfile


@receiver(post_save, sender=UserAccount)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Creates a UserProfile upon creation of a UserAccount
    """
    if created:
        UserProfile.objects.create(user=instance)
