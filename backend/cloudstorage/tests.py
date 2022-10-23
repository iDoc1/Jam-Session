from accounts.models import UserAccount
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from rest_framework.test import APIClient


class ProfilePictureTestCase(TestCase):
    """
    Tests CRUD functionality on ProfilePicture objects and urls
    """
    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.client = APIClient()
        self.user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=self.user)

    def test_post_wrong_file_type(self):
        """
        Sending the wrong file type returns client error
        """
        wrong_file_type = SimpleUploadedFile('test.mp4', b'test_data', content_type='video/mp4')
        response = self.client.post('/api/profile-pics/', {'image_file': wrong_file_type})
        self.assertEqual(response.status_code, 400)

    def test_post_empty_file(self):
        """
        Send a post request with a nonexistant file
        """
        response = self.client.post('/api/profile-pics/', {'image_file': ''})
        self.assertEqual(response.status_code, 400)
        self.assertIn('detail', response.json())

    def test_get_nonexistant_file(self):
        """
        Get a file that does not exist
        """
        response = self.client.get('/api/profile-pics/5/')
        self.assertEqual(response.status_code, 404)
        self.assertIn('detail', response.json())

    def test_update_nonexistant_file(self):
        """
        Update a file that does not exist
        """
        response = self.client.put('/api/profile-pics/5/')
        self.assertEqual(response.status_code, 404)
        self.assertIn('detail', response.json())


class MusicSampleTestCase(TestCase):
    """
    Tests CRUD functionality on MusicSample objects and urls
    """

    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.client = APIClient()
        self.user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=self.user)

    def test_post_wrong_file_type(self):
        """
        Sending the wrong file type returns client error
        """
        wrong_file_type = SimpleUploadedFile('test.png', b'test_data', content_type='image/png')
        response = self.client.post('/api/music-samples/', {'music_file': wrong_file_type})
        self.assertEqual(response.status_code, 400)

    def test_post_empty_file(self):
        """
        Send a post request with a nonexistant file
        """
        response = self.client.post('/api/music-samples/', {'music_file': ''})
        self.assertEqual(response.status_code, 400)
        self.assertIn('detail', response.json())

    def test_get_nonexistant_file(self):
        """
        Get a file that does not exist
        """
        response = self.client.get('/api/music-samples/5/')
        self.assertEqual(response.status_code, 404)
        self.assertIn('detail', response.json())

    def test_update_nonexistant_file(self):
        """
        Update a file that does not exist
        """
        response = self.client.put('/api/music-samples/5/')
        self.assertEqual(response.status_code, 404)
        self.assertIn('detail', response.json())
