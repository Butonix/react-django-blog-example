# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-31 11:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0006_auto_20180131_1128'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_image',
            field=models.ImageField(blank=True, default='/profle_images/pr_image.png', null=True, upload_to='profile_images'),
        ),
    ]
