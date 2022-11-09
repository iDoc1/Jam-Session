"""
This file defines the commands to be run prior to the app being released on Heroku
"""
import os
# import shutil


def migrate_database():
    """
    Applies Django database migrations and runs npm build command
    """

    # Run npm build the move build dir to backend dir
    # os.chdir('./frontend')
    # os.system('npm run build')
    # shutil.move('./build', '../backend')

    # Apply database migrations
    # os.chdir('../backend')
    os.chdir('./backend')
    os.system('python manage.py migrate')

    

if __name__ == '__main__':
    migrate_database()
