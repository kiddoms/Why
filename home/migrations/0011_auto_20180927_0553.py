# Generated by Django 2.1 on 2018-09-27 05:53

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0010_auto_20180927_0548'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote_a',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upvote', models.BooleanField(default=False)),
                ('downvote', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Vote_q',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upvote', models.BooleanField(default=False)),
                ('downvote', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='answer',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 9, 27, 5, 53, 46, 820673, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='question',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 9, 27, 5, 53, 46, 819481, tzinfo=utc)),
        ),
        migrations.AddField(
            model_name='vote_q',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Question'),
        ),
        migrations.AddField(
            model_name='vote_q',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='vote_a',
            name='answer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Answer'),
        ),
        migrations.AddField(
            model_name='vote_a',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]