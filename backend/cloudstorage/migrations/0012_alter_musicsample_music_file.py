# Generated by Django 4.1.2 on 2022-10-21 01:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cloudstorage', '0011_alter_musicsample_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musicsample',
            name='music_file',
            field=models.FileField(upload_to='', validators=[django.core.validators.FileExtensionValidator(['mp3', 'aac', 'ogg', 'wma'])]),
        ),
    ]
