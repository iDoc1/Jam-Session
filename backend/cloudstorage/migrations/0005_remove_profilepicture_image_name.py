# Generated by Django 4.1.2 on 2022-10-18 02:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cloudstorage', '0004_rename_image_profilepicture_image_file_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profilepicture',
            name='image_name',
        ),
    ]