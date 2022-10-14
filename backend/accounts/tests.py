from .models import UserAccount
from django.test import TestCase
from rest_framework.test import APIClient
from profiles.models import UserProfile

class GenreTestCase(TestCase):
    """
    Tests account creation functionality
    """

    def test_user_profile_creation(self):
        """
        The creation of a UserAccount triggers the creation of an associated UserProfile
        """
        num_of_profiles_before = len(UserProfile.objects.all())
        UserAccount.objects.create(email='testemail@example.com', password='testpassword')
        num_of_profiles_after = len(UserProfile.objects.all())
        self.assertEqual(num_of_profiles_before + 1, num_of_profiles_after)

    def test_user_account_email(self):
        """
        A UserAccount is created with the correct email
        """
        user = UserAccount.objects.create(email='testemail@example.com', password='testpassword')
        self.assertEqual(user.email, 'testemail@example.com')

    def test_duplicate_account(self):
        """
        Two accounts with the same email cannot be created
        """
        UserAccount.objects.create(email='testemail@example.com', password='testpassword')        
        
        error_occurred = False
        try:
            UserAccount.objects.create(email='testemail@example.com', password='testpassword')
        except:
            error_occurred = True
        finally:
            self.assertTrue(error_occurred)
