# Generated by Django 4.1.2 on 2022-10-11 23:13

import backend.shared
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instruments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instrument',
            name='name',
            field=backend.shared.LowerCaseCharField(max_length=50, unique=True),
        ),
    ]
