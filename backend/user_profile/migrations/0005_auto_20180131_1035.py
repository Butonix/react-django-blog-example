# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-31 10:35
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0004_auto_20180131_1005'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='image',
            new_name='user_image',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='avatar',
        ),
    ]
