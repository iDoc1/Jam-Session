from accounts.models import UserAccount
from django.db.utils import IntegrityError
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Instrument


class InstrumentTestCase(TestCase):
    """
    Tests GET, POST, PUT, and DELETE on the Instrument urls
    """

    def setUp(self):
        """
        Create authenticated test user and test instrument
        """
        self.client = APIClient()
        user = UserAccount.objects.create(email='testemail@test.com')
        self.client.force_authenticate(user=user)
        self.instrument = Instrument.objects.create(name='vocals')

    def test_get_instruments_list(self):
        """
        Retrieves a list of all instruments
        """
        response = self.client.get('/api/instruments/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['name'], 'vocals')

    def test_get_instruments_retrieve(self):
        """
        Retrieves an instance of an instrument
        """
        response = self.client.get(f'/api/instruments/{self.instrument.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['name'], 'vocals')

    def test_post_instrument(self):
        """
        Creates an instrument
        """
        data = {'name': 'bass guitar'}
        response = self.client.post('/api/instruments/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['name'], 'bass guitar')

    def test_post_instrument_lowercase(self):
        """
        Creates an instrument and checks that created object 'name' field is lowercase
        """
        data = {'name': 'baSs gUItAr'}
        response = self.client.post('/api/instruments/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['name'], 'baSs gUItAr')

        created_instrument = Instrument.objects.get(id=response.json()['id'])
        self.assertEqual(created_instrument.name, 'bass guitar')

    def test_put_instrument(self):
        """
        Full update of an instrument
        """
        data = {'name': 'violin'}
        response = self.client.put(f'/api/instruments/{self.instrument.id}/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['name'], 'violin')

    def test_delete_instrument(self):
        """
        Deletes an instrument
        """
        response = self.client.delete(f'/api/instruments/{self.instrument.id}/')
        self.assertEqual(response.status_code, 204)

    def test_create_duplicate_instrument(self):
        """
        Attempts to create a duplicate instrument
        """
        error_occurred = False
        try:
            Instrument.objects.create(name='vocals')
        except IntegrityError:
            error_occurred = True
        finally:
            self.assertTrue(error_occurred)
