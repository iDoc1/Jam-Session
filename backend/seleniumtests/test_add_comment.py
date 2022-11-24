# from datetime import datetime
# from django.contrib.staticfiles.testing import StaticLiveServerTestCase
# from selenium.webdriver.chrome.webdriver import WebDriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.wait import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from accounts.models import UserAccount
# from instruments.models import Instrument
# from genres.models import Genre
# from posts.models import Post, Comment
# from profiles.models import Gender, CommitmentLevel, ExperienceLevel, UserProfile


# class AddCommentTestCase(StaticLiveServerTestCase):
#     host = 'localhost'
#     port = 8000

#     def setUp(self):
#         self.user = UserAccount.objects.create_user(
#             email='testemail@test.com',
#             password='testpassword123'
#         )
#         self.user.save()

#         self.instrument = Instrument.objects.create(name='guitar')
#         self.genre = Genre.objects.create(genre='rock')
#         self.gender = Gender.objects.create(gender='Woman')
#         self.commitment_level = CommitmentLevel.objects.create(level='Just for Fun', rank=1)
#         self.experience_level = ExperienceLevel.objects.create(level='Beginner', rank=1)

#         self.profile = UserProfile.objects.get(user=self.user)
#         self.profile.first_name = 'John'
#         self.profile.last_name = 'Doe'
#         self.profile.gender = self.gender
#         self.profile.birth_date = datetime(1990, 1, 1).date()
#         self.profile.zipcode = '98105'
#         self.profile.years_playing = 10
#         self.profile.level_of_commitment = self.commitment_level
#         self.profile.seeking.add(self.instrument)
#         self.profile.genres.add(self.genre)
#         self.profile.save()

#         self.post = Post.objects.create(
#             user=self.user,
#             title='Test Post Title',
#             seeking='Musicians',
#             content='Test post content',
#             zipcode='98105'
#         )

#         self.driver = WebDriver()
#         self.driver.implicitly_wait(10)

#     def tearDown(self):
#         self.driver.quit()

#     def test_add_comment_to_post(self):
#         """
#         Navigates to an existing post page then adds a comment and checks that the comment
#         was added
#         """
#         driver = self.driver
#         driver.get(self.live_server_url + '/login')

#         email_input = driver.find_element(By.ID, 'sign-in-email')
#         email_input.send_keys('testemail@test.com')

#         password_input = driver.find_element(By.ID, 'sign-in-password')
#         password_input.send_keys('testpassword123')

#         driver.find_element(By.ID, 'sign-in-button').click()

#         # Wait for landing page to load
#         WebDriverWait(driver, 10).until(
#             EC.presence_of_element_located((By.CLASS_NAME, 'landing-image'))
#         )

#         driver.get(self.live_server_url + '/post/1')
