from datetime import datetime
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from unittest import skip
from accounts.models import UserAccount
from instruments.models import Instrument
from genres.models import Genre
from profiles.models import Gender, CommitmentLevel, ExperienceLevel, UserProfile


class CreatePostTestCase(StaticLiveServerTestCase):
    host = 'localhost'
    port = 8000

    def setUp(self):
        self.user = UserAccount.objects.create_user(
            email='testemail@test.com',
            password='testpassword123'
        )
        self.user.save()

        self.instrument = Instrument.objects.create(name='guitar')
        self.genre = Genre.objects.create(genre='rock')
        self.gender = Gender.objects.create(gender='Woman')
        self.commitment_level = CommitmentLevel.objects.create(level='Just for Fun', rank=1)
        self.experience_level = ExperienceLevel.objects.create(level='Beginner', rank=1)

        self.profile = UserProfile.objects.get(user=self.user)
        self.profile.first_name = 'John'
        self.profile.last_name = 'Doe'
        self.profile.gender = self.gender
        self.profile.birth_date = datetime(1990, 1, 1).date()
        self.profile.zipcode = '98105'
        self.profile.years_playing = 10
        self.profile.level_of_commitment = self.commitment_level
        self.profile.seeking.add(self.instrument)
        self.profile.genres.add(self.genre)
        self.profile.save()

        self.driver = WebDriver()
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    @skip('Do not include selenium tests in pipeline')
    def test_add_post(self):
        """
        Navigate to new post page then add a new post
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

        driver.get(self.live_server_url + '/new-post')

        title_input = driver.find_element(By.ID, 'post-title')
        title_input.send_keys('Test Post Title')

        # Select Seeking dropdown option
        driver.find_element(By.CSS_SELECTOR, 'div.seeking-dropdown').click()
        driver.find_element(By.XPATH, "//div[@class='Dropdown-option' and text()='Musicians']").click()

        content_input = driver.find_element(By.ID, 'post-content')
        content_input.send_keys('Test post content')

        # Submit new post
        driver.find_element(By.CLASS_NAME, 'post-submit-button').click()

        # Wait for post page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'post-banner'))
        )

        self.assertEqual(driver.current_url, self.live_server_url + '/post/1')
