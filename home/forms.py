from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm


class LoginForm(forms.Form):
	Username = forms.CharField()
	Password = forms.CharField(widget = forms.PasswordInput)
	
	
class RegisterForm(ModelForm):
	class Meta:
		model = User
		fields = ['username', 'email' , 'first_name' , 'last_name' , 'password']


class QuestionForm(forms.Form):
	text = forms.CharField(max_length = 140)
	topic_choices = (
		('topic1' , 'topic1'),
		('topic2' , 'topic2'),
		)
	interests = forms.MultipleChoiceField(required = True , widget = forms.CheckboxSelectMultiple , choices = topic_choices)

class AnswerForm(forms.Form):
	text = forms.CharField(max_length = 300)
	