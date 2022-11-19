from accounts.models import UserAccount
from datetime import datetime
from dateutil import parser
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from genres.models import Genre
from instruments.models import Instrument
from .models import CommitmentLevel, Gender, ExperienceLevel, UserProfile, get_year_diff


class UserProfileTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the UserProfile urls
    """

    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.user = UserAccount.objects.create(email='testemail@test.com')

        # Create access token for user
        access_token = RefreshToken.for_user(self.user).access_token
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + str(access_token))

        self.commitment_level = CommitmentLevel(level='Just for fun', rank=1)
        self.gender = Gender.objects.create(gender='Man')
        self.experience_level = ExperienceLevel.objects.create(level='Beginner', rank=1)
        self.instrument = Instrument.objects.create(name='guitar')
        self.genre = Genre.objects.create(genre='rock')

    def test_profile_full_name(self):
        """
        User's full name is correct
        """
        UserProfile.objects.filter(user=self.user).update(
            first_name='John',
            last_name='Doe'
        )
        profile = UserProfile.objects.get(user=self.user)

        self.assertEqual(profile.full_name(), 'John Doe')

    def test_profile_city(self):
        """
        User's city is correct
        """
        UserProfile.objects.filter(user=self.user).update(
            zipcode='98105'
        )
        profile = UserProfile.objects.get(user=self.user)

        self.assertEqual(profile.city(), 'Seattle')

    def test_profile_state(self):
        """
        User's state is correct
        """
        UserProfile.objects.filter(user=self.user).update(
            zipcode='98105'
        )
        profile = UserProfile.objects.get(user=self.user)

        self.assertEqual(profile.state(), 'WA')

    def get_nonexistant_profile(self):
        """
        Attempt to get profile that does not exist
        """
        response = self.client.get('/api/profiles/111/')
        data = response.json()
        self.assertEqual(response.status_code, 404)
        self.assertEqual(data['detail'], 'requested profile does not exist')

    def test_get_public_user_profile(self):
        """
        Get another user's profile with the public fields only (no birth or join dates)
        """
        UserAccount.objects.create(email='testemail2@test.com')  # user number two

        response = self.client.get('/api/profiles/2/')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertNotIn('birth_date', data)
        self.assertNotIn('join_date', data)

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
        self.assertIsNone(data['profile_picture'])
        self.assertEqual(parser.parse(data['join_date']).date(), timezone.now().date())
        self.assertEqual(data['years_playing'], 0)
        self.assertIsNone(data['level_of_commitment'])
        self.assertEqual(data['seeking'], [])
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
            'seeking': [{'id': 1, 'name': 'guitar'}],
        }

        response = self.client.patch('/api/profiles/1/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['first_name'], 'John')
        self.assertEqual(data['last_name'], 'Doe')
        self.assertEqual(data['birth_date'], datetime(1990, 1, 1).date())
        self.assertEqual(data['zipcode'], '12345')
        self.assertEqual(data['years_playing'], 10)
        self.assertEqual(data['seeking'][0]['name'], 'guitar')

    def test_partial_update_user_profile(self):
        """
        Update only a few of the writeable fields
        """
        data = {
            'zipcode': '22222',
            'years_playing': 4,
            'seeking': [{'id': 1, 'name': 'guitar'}],
        }

        response = self.client.patch('/api/profiles/1/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['zipcode'], '22222')
        self.assertEqual(data['years_playing'], 4)
        self.assertEqual(data['seeking'][0]['name'], 'guitar')

    def test_update_profile_unauthorized(self):
        """
        Attempt to update a different user's profile
        """
        UserAccount.objects.create(email='testemail2@test.com')  # user number two
        data = {
            'first_name': 'Jane',
            'last_name': 'Doe'
        }

        response = self.client.patch('/api/profiles/2/', data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, 401)
        self.assertEqual(data['detail'], 'requestor is not authorized to edit profile that is not their own')

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
        self.assertEqual(parser.parse(data['join_date']).date(), timezone.now().date())

    def test_cannot_delete_user_profile(self):
        """
        Profile cannot be deleted using /api/profiles endpoint
        """
        response = self.client.delete('/api/profiles/1/')
        self.assertEqual(response.status_code, 405)

    def test_get_year_diff_month_greater(self):
        """
        Get year difference when end date has month greater than start date month
        """
        start_date = timezone.datetime(2000, 3, 1)
        end_date = timezone.datetime(2022, 4, 1)
        self.assertEqual(get_year_diff(start_date, end_date), 22)

    def test_get_year_diff_day_greater(self):
        """
        Get year difference when end date has day greater than start date day
        """
        start_date = timezone.datetime(2000, 3, 1)
        end_date = timezone.datetime(2022, 3, 5)
        self.assertEqual(get_year_diff(start_date, end_date), 22)

    def test_get_year_diff_month_less_than(self):
        """
        Get year difference when end date has month less than start date month
        """
        start_date = timezone.datetime(2000, 3, 1)
        end_date = timezone.datetime(2022, 2, 1)
        self.assertEqual(get_year_diff(start_date, end_date), 21)

    def test_get_year_diff_day_less_than(self):
        """
        Get year difference when end date has day less than start date day
        """
        start_date = timezone.datetime(2000, 3, 4)
        end_date = timezone.datetime(2022, 3, 1)
        self.assertEqual(get_year_diff(start_date, end_date), 21)

    def test_get_year_diff_same_month_day(self):
        """
        Get year difference when start and end date occur on same month and day
        """
        start_date = timezone.datetime(2000, 3, 1)
        end_date = timezone.datetime(2022, 3, 1)
        self.assertEqual(get_year_diff(start_date, end_date), 22)


class SocialMediaTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the SocialMediaLink urls
    """

    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.client = APIClient()
        self.user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=self.user)

        self.commitment_level = CommitmentLevel(level='Just for fun', rank=1)
        self.gender = Gender.objects.create(gender='Man')
        self.experience_level = ExperienceLevel.objects.create(level='Beginner', rank=1)
        self.instrument = Instrument.objects.create(name='guitar')
        self.genre = Genre.objects.create(genre='rock')

    def test_post_social_media_link(self):
        """
        Add a new social media link
        """
        data = {
            "social_media_site": "facebook",
            "social_media_link": "http://www.facebook.com/fakeprofile"
        }
        response = self.client.post('/api/social-media/', data, format='json')
        data = response.json()

        self.assertEqual(response.status_code, 201)
        self.assertIn('id', data)
        self.assertIn('user', data)
        self.assertIn('social_media_site', data)
        self.assertIn('social_media_link', data)

    def test_put_social_media_link(self):
        """
        Replace an existing social media link with an edited one
        """
        data = {
            "social_media_site": "facebook",
            "social_media_link": "http://www.facebook.com/fakeprofile"
        }
        self.client.post('/api/social-media/', data, format='json')

        data = {
            "social_media_site": "facebook",
            "social_media_link": "http://www.facebook.com/newfakeprofile"
        }
        response = self.client.put('/api/social-media/1/', data, format='json')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('id', data)
        self.assertIn('user', data)
        self.assertIn('social_media_site', data)
        self.assertIn('social_media_link', data)

    def test_get_social_media_links(self):
        """
        Get a user's social media links
        """
        data = {
            "social_media_site": "facebook",
            "social_media_link": "http://www.facebook.com/fakeprofile"
        }
        response = self.client.post('/api/social-media/', data, format='json')

        response = self.client.get('/api/social-media/')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 1)

    def test_delete_social_media_link(self):
        """
        Replace an existing social media link with an edited one
        """
        data = {
            "social_media_site": "facebook",
            "social_media_link": "http://www.facebook.com/fakeprofile"
        }
        self.client.post('/api/social-media/', data, format='json')

        response = self.client.delete('/api/social-media/1/')
        self.assertEqual(response.status_code, 204)
