from accounts.models import UserAccount
from datetime import datetime
from dateutil import parser
from django.test import TestCase
from rest_framework.test import APIClient
from genres.models import Genre
from instruments.models import Instrument
from .models import CommitmentLevel, Gender, ExperienceLevel


class UserProfileTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the UserProfile urls
    """

    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.client = APIClient()
        user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=user)

        self.commitment_level = CommitmentLevel(level='Just for fun', rank=1)
        self.gender = Gender.objects.create(gender='Man')
        self.experience_level = ExperienceLevel.objects.create(level='Beginner', rank=1)
        self.instrument = Instrument.objects.create(name='guitar')
        self.genre = Genre.objects.create(genre='rock')

    def test_get_blank_user_profile(self):
        """
        Retrieve currently authenticated user's profile
        """
        response = self.client.get('/api/profiles/')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['first_name'], '')
        self.assertEqual(data['last_name'], '')
        self.assertIsNone(data['gender'])
        self.assertIsNone(data['birth_date'])
        self.assertIsNone(data['profile_picture_url'])
        self.assertEqual(parser.parse(data['join_date']).date(), datetime.now().date())
        self.assertEqual(data['years_playing'], 0)
        self.assertIsNone(data['level_of_commitment'])
        self.assertEqual(data['seeking'], '')
        self.assertEqual(data['instruments'], [])
        self.assertEqual(data['genres'], [])

    def test_full_update_user_profile(self):
        """
        Update all writeable fields
        """
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'birth_date': datetime(1990, 1, 1).date(),
            'zipcode': '12345',
            'years_playing': 10,
            'seeking': 'A really cool band to play with',
        }

        response = self.client.patch('/api/profiles/1/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['first_name'], 'John')
        self.assertEqual(data['last_name'], 'Doe')
        self.assertEqual(data['birth_date'], datetime(1990, 1, 1).date())
        self.assertEqual(data['zipcode'], '12345')
        self.assertEqual(data['years_playing'], 10)
        self.assertEqual(data['seeking'], 'A really cool band to play with')

    def test_partial_update_user_profile(self):
        """
        Update only a few of the writeable fields
        """
        data = {
            'zipcode': '22222',
            'years_playing': 4,
            'seeking': 'A neat band to play with',
        }

        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['zipcode'], '22222')
        self.assertEqual(data['years_playing'], 4)
        self.assertEqual(data['seeking'], 'A neat band to play with')

    def test_add_commitment_level_to_user_profile(self):
        """
        Add a commitment level for the user
        """
        data = {
            'level_of_commitment': {'id': 1, 'level': 'Just for fun', 'rank': 1}
        }

        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['level_of_commitment']['id'], 1)

    def test_add_gender_to_user_profile(self):
        """
        Add a gender to the user profile
        """
        data = {
            'gender': {'id': 1, 'gender': 'Man'}
        }

        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['gender']['id'], 1)

    def test_add_instrument_to_user_profile(self):
        """
        Add an instrument and experience level to the user's profile
        """
        data = {
            'instruments': [{
                'instrument': {'id': 1, 'name': 'guitar'},
                'experience_level': {'id': 1, 'level': 'Beginner', 'rank': 1}
            }]}

        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['instruments'][0]['instrument']['id'], 1)

    def test_remove_instruments_from_user_profile(self):
        """
        Remove all instruments from user profile
        """
        data = {
            'instruments': [{
                'instrument': {'id': 1, 'name': 'guitar'},
                'experience_level': {'id': 1, 'level': 'Beginner', 'rank': 1}
            }]}
        response = self.client.patch('/api/profiles/1/', data, format='json')  # Add
        removed_data = {'instruments': []}
        response = self.client.patch('/api/profiles/1/', removed_data, format='json')  # Remove

        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['instruments'], [])

    def test_add_genre_to_user_profile(self):
        """
        Add a genre to the user's profile
        """
        data = {
            'genres': [
                {'id': 1, 'genre': 'bass guitar'}
            ]}

        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['genres'][0]['id'], 1)

    def test_remove_all_genres_from_user_profile(self):
        """
        Remove all genres from user profile
        """
        data = {
            'genres': [
                {'id': 1, 'genre': 'bass guitar'}
            ]}
        response = self.client.patch('/api/profiles/1/', data, format='json')  # Add
        removed_data = {'genres': []}
        response = self.client.patch('/api/profiles/1/', removed_data, format='json')  # Remove

        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['genres'], [])

    def test_cannot_update_join_date(self):
        """
        Client cannot update the join date of the user
        """
        data = {'join_date': datetime(2000, 1, 1)}
        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(parser.parse(data['join_date']).date(), datetime.now().date())

    def test_cannot_update_profile_pic_url(self):
        """
        Client cannot update the profile picture URL for the /api/profiles endpoint
        """
        data = {'profile_picture_url': 'someurl.com'}
        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertIsNone(data['profile_picture_url'])

    def test_cannot_delete_user_profile(self):
        """
        Profile cannot be deleted using /api/profiles endpoint
        """
        response = self.client.delete('/api/profiles/1/')
        self.assertEqual(response.status_code, 405)
