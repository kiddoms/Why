# Generated by Django 2.1 on 2018-09-25 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interests',
            name='interest',
            field=models.CharField(choices=[('topic1', 'topic1'), ('topic2', 'topic2')], max_length=10),
        ),
    ]