# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-27 11:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact_form', '0002_contactform_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactform',
            name='captcha',
            field=models.TextField(blank=True, null=True),
        ),
    ]
