from accounts.models import UserAccount
from django.db.utils import IntegrityError
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Genre


class GenreTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the Genre urls
    """

    def setUp(self):
        """
        Create authenticated test user and test genre
        """
        self.client = APIClient()
        user = UserAccount.objects.create(email='testemail')
        self.client.force_authenticate(user=user)
        self.genre = Genre.objects.create(genre='rock')

    def test_get_genres_list(self):
        """
        Retrieves a list of all genres
        """
        response = self.client.get('/api/genres/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['genre'], 'rock')

    def test_get_genres_retrieve(self):
        """
        Retrieves an instance of a genre
        """
        response = self.client.get(f'/api/genres/{self.genre.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['genre'], 'rock')

    def test_post_genre(self):
        """
        Creates a genre
        """
        data = {'genre': 'classical'}
        response = self.client.post('/api/genres/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['genre'], 'classical')

    def test_post_genre_lowercase(self):
        """
        Creates a genre and checks that created object 'genre' field is lowercase
        """
        data = {'genre': 'claSSicaL'}
        response = self.client.post('/api/genres/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['genre'], 'claSSicaL')

        created_genre = Genre.objects.get(id=response.json()['id'])
        self.assertEqual(created_genre.genre, 'classical')

    def test_put_genre(self):
        """
        Full update of a genre
        """
        data = {'genre': 'blues'}
        response = self.client.put(f'/api/genres/{self.genre.id}/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['genre'], 'blues')

    def test_delete_genre(self):
        """
        Deletes a genre
        """
        response = self.client.delete(f'/api/genres/{self.genre.id}/')
        self.assertEqual(response.status_code, 204)

    def test_create_duplicate_genre(self):
        """
        Attempts to create a duplicate genre
        """
        error_occurred = False
        try:
            Genre.objects.create(genre='rock')
        except IntegrityError:
            error_occurred = True
        finally:
            self.assertTrue(error_occurred)
