# Generated by Django 4.1.2 on 2022-10-24 17:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0021_remove_socialmedialink_user_profile_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialmedialink',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='social_media', to=settings.AUTH_USER_MODEL),
        ),
    ]
