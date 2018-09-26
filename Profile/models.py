from django.db import models
from django.contrib.auth.models import User
from home.models import Question
# Create your models here.
class Interests(models.Model):
	user = models.ForeignKey(User , on_delete = models.CASCADE)
	topic_choices = (
		('topic1' , 'topic1'),
		('topic2' , 'topic2'),
		)
	interest = models.CharField(choices = topic_choices , max_length = 10 , unique = True)


class Save(models.Model):
	user = models.ForeignKey(User , on_delete = models.CASCADE)
	question = models.ForeignKey(Question , on_delete = models.CASCADE)

class Follow(models.Model):
	follower_id = models.IntegerField(default = 0)
	followee_id = models.IntegerField(default = 0 )
