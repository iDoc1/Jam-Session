from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from unittest import skip
from accounts.models import UserAccount
from instruments.models import Instrument
from genres.models import Genre
from profiles.models import Gender, CommitmentLevel, ExperienceLevel


class ProfileTestCase(StaticLiveServerTestCase):
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

        self.driver = WebDriver()
        self.driver.implicitly_wait(10)

    def tearDown(self):
        self.driver.quit()

    @skip('Do not include selenium tests in pipeline')
    def test_enter_profile_details(self):
        """
        User logs in, navigates to proflied edit page, enters their profile details,
        then submits. Check that user is navigated back to profile page after successful
        submission.
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

        # Navigate to edit profile page
        driver.find_element(By.ID, 'profile-link').click()
        driver.find_element(By.ID, 'edit-profile-button').click()

        self.assertEqual(driver.current_url, self.live_server_url + '/profile/edit')

        # Enter name
        first_name_input = driver.find_element(By.ID, 'edit-profile-first')
        first_name_input.send_keys('John')

        last_name_input = driver.find_element(By.ID, 'edit-profile-last')
        last_name_input.send_keys('Doe')

        # Select gender from dropdown
        driver.find_element(By.CSS_SELECTOR, 'div.edit-gender').click()
        driver.find_element(By.XPATH, "//div[@class='Dropdown-option' and text()='Woman']").click()

        # Enter birth date
        birth_date_input = driver.find_element(By.ID, 'edit-profile-birth-date')
        birth_date_input.send_keys('01/01/1990')

        # Enter zipcode
        zipcode_input = driver.find_element(By.ID, 'edit-profile-zipcode')
        zipcode_input.send_keys('98105')

        # Select level of commitment
        driver.find_element(By.CSS_SELECTOR, 'div.edit-commitment-level').click()
        driver.find_element(By.XPATH, "//div[@class='Dropdown-option' and text()='Just for Fun']").click()

        # Select instrument and experience level
        driver.find_element(By.CSS_SELECTOR, 'div.edit-instrument-dropdown').click()
        driver.find_element(By.XPATH, "//div[@class='Dropdown-option' and text()='Guitar']").click()
        driver.find_element(By.CSS_SELECTOR, 'div.edit-experience-level').click()
        driver.find_element(By.XPATH, "//div[@class='Dropdown-option' and text()='Beginner']").click()

        # Select seeking instrument
        driver.find_element(By.CSS_SELECTOR, 'div.edit-seeking-dropdown').click()
        driver.find_element(By.XPATH, "//div[@class='Dropdown-option' and text()='Guitar']").click()

        driver.find_element(By.ID, 'save-changes-button').click()

        # Wait for profile page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'profile-container'))
        )

        self.assertEqual(driver.current_url, self.live_server_url + '/profile')
