# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-02-06 06:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0006_auto_20180131_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.CharField(default='python', max_length=120),
        ),
    ]
