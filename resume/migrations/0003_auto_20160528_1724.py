# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-29 00:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0002_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Career',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('start_date', models.CharField(max_length=20)),
                ('end_date', models.CharField(max_length=20)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1000)),
                ('display', models.BooleanField()),
            ],
        ),
        migrations.AddField(
            model_name='education',
            name='degree',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='education',
            name='display',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='education',
            name='description',
            field=models.TextField(max_length=1000),
        ),
    ]