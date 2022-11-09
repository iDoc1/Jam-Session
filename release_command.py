"""
This file defines the commands to be run prior to the app being released on Heroku
"""
import os
import shutil


def migrate_database():
    """
    Applies Django database migrations and runs npm build command
    """

    # Move build directory to backend directory
    os.chdir('./frontend')
    shutil.move('./build', '../backend')

    # Apply database migrations
    os.chdir('../backend')
    os.system('python manage.py migrate')


if __name__ == '__main__':
    migrate_database()
