# Generated by Django 2.1 on 2018-09-27 05:48

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_auto_20180926_1454'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='downvote',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='upvote',
        ),
        migrations.RemoveField(
            model_name='question',
            name='downvote',
        ),
        migrations.RemoveField(
            model_name='question',
            name='upvote',
        ),
        migrations.AlterField(
            model_name='answer',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 9, 27, 5, 48, 8, 273533, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='question',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 9, 27, 5, 48, 8, 272902, tzinfo=utc)),
        ),
    ]
