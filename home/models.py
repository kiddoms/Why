from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
class Question(models.Model):
	text = models.CharField(max_length = 140)
	upvote = models.IntegerField(default = 0)
	downvote = models.IntegerField(default = 0)
	user = models.ForeignKey(User, on_delete = models.CASCADE)
	interests = models.CharField(max_length = 10000 , default = '')
	creation_date = models.DateTimeField(default = timezone.now())

class Answer(models.Model):
	user = models.ForeignKey(User, on_delete = models.CASCADE)
	question = models.ForeignKey(Question , on_delete = models.CASCADE)
	text = models.CharField(max_length = 300)
	a_type = models.CharField(default = "text" , max_length = 10)
	path = models.CharField(max_length = 140 , default = "")
	upvote = models.IntegerField(default = 0)
	downvote = models.IntegerField(default = 0)
	creation_date = models.DateTimeField(default = timezone.now())

	def __str__(self):
		return str(self.text)
	class Meta:
		unique_together = ('user' , 'question',)


class Comment(models.Model):
	answer = models.ForeignKey(Answer, on_delete = models.CASCADE)
	user = models.ForeignKey(User , on_delete = models.CASCADE)
	comment = models.CharField(max_length = 50)