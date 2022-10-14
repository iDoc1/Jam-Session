# Generated by Django 4.1.2 on 2022-10-13 00:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_experiencelevel_rank'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommitmentLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(max_length=30, unique=True)),
                ('rank', models.PositiveSmallIntegerField(default=1)),
            ],
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='level_of_commitment',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='level_of_commitment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='profiles.commitmentlevel'),
        ),
    ]
