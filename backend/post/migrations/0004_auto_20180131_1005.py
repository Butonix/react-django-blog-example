# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-31 10:05
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_auto_20180127_1128'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-posted_on']},
        ),
    ]