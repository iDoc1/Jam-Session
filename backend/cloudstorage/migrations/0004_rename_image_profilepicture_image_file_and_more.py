# Generated by Django 4.1.2 on 2022-10-18 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cloudstorage', '0003_alter_profilepicture_image_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profilepicture',
            old_name='image',
            new_name='image_file',
        ),
        migrations.AlterField(
            model_name='profilepicture',
            name='image_name',
            field=models.CharField(max_length=255),
        ),
    ]
