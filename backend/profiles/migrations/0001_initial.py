# Generated by Django 4.1.2 on 2022-10-11 01:57

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import profiles.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('instruments', '0001_initial'),
        ('genres', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserExperienceLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experience_level', models.CharField(max_length=30)),
                ('instrument', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='instruments.instrument')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(default='', max_length=75)),
                ('last_name', models.CharField(default='', max_length=75)),
                ('gender', models.CharField(default='', max_length=30)),
                ('birth_date', models.DateField(default=None)),
                ('zipcode', models.CharField(default='', max_length=10)),
                ('profile_picture_url', models.URLField(blank=True, null=True)),
                ('join_date', models.DateTimeField(default=datetime.datetime(2022, 10, 10, 18, 57, 45, 790695))),
                ('years_playing', models.SmallIntegerField(default=0)),
                ('level_of_commitment', models.CharField(default='', max_length=75)),
                ('seeking', models.TextField(default='')),
                ('genres', models.ManyToManyField(to='genres.genre')),
                ('instruments', models.ManyToManyField(through='profiles.UserExperienceLevel', to='instruments.instrument')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='userexperiencelevel',
            name='user_profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.userprofile'),
        ),
    ]
