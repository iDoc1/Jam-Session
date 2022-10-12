"""
Defines the necessary models for a custom User class with an email as the username. This
file was adapted from the following resource: https://github.com/linkedweb/auth_system
"""
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from profiles.models import UserProfile


class UserAccountManager(BaseUserManager):
    """
    Defines a custom manager for UserAccount. Required when AbstractBaseIser is used to
    create custom User classes.
    """
    def create_user(self, email, password=None):
        """
        Creates a standard user without special privileges
        """
        if not email:
            raise ValueError("Users must have an email")
        
        # Create the UserAccount
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)  # Create hashed version of password
        user.save()

        # Create a UserProfile for this UserAccount
        user = UserAccount.objects.get(id=user.id)
        UserProfile.objects.create(user=user)
        return user

    def create_superuser(self, email, password):
        """
        Creates a user with admin site privileges
        """
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    Defines a custom User model with email as the username field
    """
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'  # Make email the username

    def get_username(self):
        return self.email

    def __str__(self):
        return self.email
