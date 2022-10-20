import mock
from accounts.models import UserAccount
from datetime import datetime
from dateutil import parser
from django.core.files import File
from django.test import TestCase
from rest_framework.test import APIClient
from .models import ProfilePicture


class ProfilePictureTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the ProfilePicture urls
    """

    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.client = APIClient()
        user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=user)

        self.file_mock = mock.MagicMock(spec=File)
        self.file_mock.name = 'test-image.jpg'
        self.profile_pic = ProfilePicture(user=user, image_file=self.file_mock)

    def test_get_profile_pic(self):
        """
        Get an existing profile picture
        """
        response = self.client.get('/api/profile-pics/1/')
        data = response.json()
        print(data)
        self.assertEqual(response.status_code, 200)


    def test_get_empty_profile_pic(self):
        """
        Get a profile picture that doesn't exist
        """
        pass

    def test_update_profile_pic(self):
        """
        Change the profile picture to a new one
        """
        pass

# Create your tests here.
# Test wrong file type and size
# Test does not exist for update/delete
# Test CRUD