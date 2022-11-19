from django.test import TestCase
from rest_framework.test import APIClient
from accounts.models import UserAccount
from genres.models import Genre
from instruments.models import Instrument
from .models import Post, Comment
from .zipcode_lookup import ZipCodeLookup


class PostsCommentsTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the Post and Comment urls
    """

    def setUp(self):
        """
        Create authenticated test user and test objects
        """
        self.client = APIClient()
        self.user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=self.user)

        self.instrument = Instrument.objects.create(name='guitar')
        self.genre = Genre.objects.create(genre='jazz')

        self.post = Post.objects.create(
            user=self.user,
            title='test title',
            seeking='musicians',
            content='test post',
            zipcode='12345',
        )
        self.post.instruments.add(self.instrument)
        self.post.genres.add(self.genre)

        self.comment_user = UserAccount.objects.create(email='testcomment@test.com')
        self.comment = Comment.objects.create(
            user=self.comment_user,
            post=self.post,
            content='test comment'
        )

    def test_retrieve_post(self):
        """
        Get an individual post
        """
        response = self.client.get('/api/posts/1/')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(data['owner_user_id']), self.user.id)
        self.assertEqual(data['title'], 'test title')
        self.assertEqual(data['seeking'], 'musicians')
        self.assertEqual(data['content'], 'test post')
        self.assertEqual(data['zipcode'], '12345')
        self.assertEqual(data['instruments'][0]['name'], 'guitar')
        self.assertEqual(data['genres'][0]['genre'], 'jazz')
        self.assertEqual(len(data['comments']), 1)

    def test_create_post(self):
        """
        Create a new post using a POST request
        """
        data = {
            'title': 'test title2',
            'seeking': 'musicians2',
            'content': 'test post2',
            'zipcode': '123452',
            'instruments': [
                {'name': 'guitar'}
            ],
            'genres': [
                {'genre': 'jazz'}
            ]
        }
        response = self.client.post('/api/posts/', data, format='json')
        data = response.json()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(int(data['owner_user_id']), self.user.id)
        self.assertEqual(data['title'], 'test title2')
        self.assertEqual(data['seeking'], 'musicians2')
        self.assertEqual(data['content'], 'test post2')
        self.assertEqual(data['zipcode'], '123452')
        self.assertEqual(data['instruments'][0]['name'], 'guitar')
        self.assertEqual(data['genres'][0]['genre'], 'jazz')
        self.assertEqual(len(data['comments']), 0)

    def test_edit_post(self):
        """
        Change just the post content and title
        """
        data = {
            'title': 'new title',
            'content': 'new content',
        }
        response = self.client.patch('/api/posts/1/', data, format='json')
        data = response.json()

        response = self.client.get('/api/posts/1/')
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(data['owner_user_id']), self.user.id)
        self.assertEqual(data['title'], 'new title')
        self.assertEqual(data['seeking'], 'musicians')
        self.assertEqual(data['content'], 'new content')
        self.assertEqual(data['zipcode'], '12345')
        self.assertEqual(data['instruments'][0]['name'], 'guitar')
        self.assertEqual(data['genres'][0]['genre'], 'jazz')
        self.assertEqual(len(data['comments']), 1)

    def test_delete_post(self):
        """
        Delete an existing post
        """
        response = self.client.delete('/api/posts/1/')
        self.assertEqual(response.status_code, 204)

    def test_add_instrument(self):
        """
        Add a new instrument to a post
        """
        data = {
            'instruments': [
                {'name': 'vocals'}
            ]
        }
        response = self.client.patch('/api/posts/1/', data, format='json')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['instruments'][0]['name'], 'vocals')

    def test_add_genre(self):
        """
        Add a new genre to a post
        """
        data = {
            'genres': [
                {'genre': 'blues'}
            ]
        }
        response = self.client.patch('/api/posts/1/', data, format='json')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['genres'][0]['genre'], 'blues')

    def test_add_comment(self):
        """
        Add a new comment to an existing post
        """
        data = {
            'user': 1,
            'post': 1,
            'content': 'I"d like to join!'
        }
        response = self.client.post('/api/comments/', data, format='json')
        data = response.json()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['user'], 1)
        self.assertEqual(data['post'], 1)
        self.assertEqual(data['content'], 'I"d like to join!')

    def test_get_posts_without_query_params(self):
        """
        Attempt to get list of Posts without specifying any query params
        """
        response = self.client.get('/api/posts/')
        data = response.json()
        self.assertEqual(data['detail'], 'GET requests must have either query params or a key specified in URL')

    def test_get_posts_without_zipcode_or_radius(self):
        """
        Attempt to get list of Posts without specifying zipcode or radius
        """
        response = self.client.get('/api/posts/?instrument=guitar')
        data = response.json()
        self.assertEqual(data['detail'], 'zipcode and radius are required parameters')

    def test_get_posts_with_zipcode_only(self):
        """
        Attempt to get list of Posts and only specify a zipcode
        """
        response = self.client.get('/api/posts/?zipcode=98105')
        data = response.json()
        self.assertEqual(data['detail'], 'radius parameter is missing')

    def test_get_posts_with_radius_only(self):
        """
        Attempt to get list of Posts and only specify a radius
        """
        response = self.client.get('/api/posts/?radius=5')
        data = response.json()
        self.assertEqual(data['detail'], 'zipcode parameter is missing')

    def test_get_posts_with_invalid_zipcode(self):
        """
        Attempt to get list of Posts with a zipcode that is not 5 digits
        """
        response = self.client.get('/api/posts/?zipcode=123456&radius=10')
        data = response.json()
        self.assertEqual(data['detail'], 'zipcode must be 5 digits long')

    def test_get_posts_with_nonexistant_zipcode(self):
        """
        Attempt to get list of Posts with a zipcode that does not exist
        """
        response = self.client.get('/api/posts/?zipcode=00000&radius=10')
        data = response.json()
        self.assertEqual(data['detail'], 'zipcode does not exist')

    def test_get_posts_with_invalid_radius(self):
        """
        Attempt to get list of Posts with a radius that is not a number
        """
        response = self.client.get('/api/posts/?zipcode=98105&radius=abc')
        data = response.json()
        self.assertEqual(data['detail'], 'radius must be a positive integer')

    def test_get_posts_with_negative_radius(self):
        """
        Attempt to get list of Posts with a radius that is not a number
        """
        response = self.client.get('/api/posts/?zipcode=98105&radius=-5')
        data = response.json()
        self.assertEqual(data['detail'], 'radius must be a positive integer')


class ZipCodeLookupTestCase(TestCase):
    """
    Tests functionality of the ZipCodeLookup class
    """

    def test_zipcode_exists(self):
        """
        Zipcode exists returns true
        """
        zipcode_lookup = ZipCodeLookup('98105')
        exists = zipcode_lookup.zipcode_exists()
        self.assertTrue(exists)

    def test_zipcode_does_not_exist(self):
        """
        Zipcode exists returns true
        """
        zipcode_lookup = ZipCodeLookup('12')
        exists = zipcode_lookup.zipcode_exists()
        self.assertFalse(exists)

    def test_zipcodes_in_radius(self):
        """
        Specific zipcode exists within 2 mile radius
        """
        zipcode_lookup = ZipCodeLookup('98105')
        results = zipcode_lookup.get_zipcodes_in_radius(2)
        self.assertIn('98102', results)

    def test_zipcodes_in_zero_radius(self):
        """
        A zero mile radius returns a set containing a single zipcode
        """
        zipcode_lookup = ZipCodeLookup('98105')
        results = zipcode_lookup.get_zipcodes_in_radius(0)
        self.assertEquals(results, {'98105'})

    def test_zipcode_city(self):
        """
        Zipcode lookup city is corrent
        """
        zipcode_lookup = ZipCodeLookup('98105')
        city = zipcode_lookup.get_city()
        self.assertEqual(city, 'Seattle')

    def test_zipcode_state(self):
        """
        Zipcode lookup city is corrent
        """
        zipcode_lookup = ZipCodeLookup('98105')
        state = zipcode_lookup.get_state()
        self.assertEqual(state, 'WA')
