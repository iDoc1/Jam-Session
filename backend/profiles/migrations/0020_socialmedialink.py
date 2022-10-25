# Generated by Django 4.1.2 on 2022-10-24 17:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0019_alter_userprofile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialMediaLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('social_media_site', models.CharField(max_length=100)),
                ('social_media_link', models.URLField()),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='socialmedia', to='profiles.userprofile')),
            ],
        ),
    ]
