from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from unittest import skip
from accounts.models import UserAccount


class LoginTestCase(StaticLiveServerTestCase):
    host = 'localhost'
    port = 8000

    def setUp(self):
        self.user = UserAccount.objects.create_user(
            email='testemail@test.com',
            password='testpassword123'
        )
        self.user.save()

        self.driver = WebDriver()
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    @skip('Do not include selenium tests in pipeline')
    def test_login(self):
        """
        Logs an existing user in and routes to home screen
        """
        driver = self.driver
        driver.get(self.live_server_url + '/login')

        email_input = driver.find_element(By.ID, 'sign-in-email')
        email_input.send_keys('testemail@test.com')

        password_input = driver.find_element(By.ID, 'sign-in-password')
        password_input.send_keys('testpassword123')

        driver.find_element(By.ID, 'sign-in-button').click()

        # Wait for landing page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'landing-image'))
        )

        self.assertEqual(driver.current_url, self.live_server_url + '/')

    @skip('Do not include selenium tests in pipeline')
    def test_login_fail(self):
        """
        Attempts to log user in user wrong password
        """
        driver = self.driver
        driver.get(self.live_server_url + '/login')

        email_input = driver.find_element(By.ID, 'sign-in-email')
        email_input.send_keys('testemail@test.com')

        password_input = driver.find_element(By.ID, 'sign-in-password')
        password_input.send_keys('wrongpassword')

        driver.find_element(By.ID, 'sign-in-button').click()
        error_text = driver.find_element(By.ID, 'error-message')

        self.assertEqual(driver.current_url, self.live_server_url + '/login')
        self.assertEqual(error_text.text, 'Username and/or password incorrect')
