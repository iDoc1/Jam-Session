"""
This file defines the commands to be run prior to the app being released on Heroku
"""
import os


def migrate_database():
    """
    Applies Django database migrations
    """

    # Apply database migrations
    os.chdir('./backend')
    os.system('python manage.py migrate')


if __name__ == '__main__':
    migrate_database()
