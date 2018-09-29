from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm


class LoginForm(forms.Form):
	Username = forms.CharField(label = "Username", widget = forms.TextInput(attrs = {'class':'form-control'}))
	Password = forms.CharField(label = "Password",widget = forms.PasswordInput(attrs = {'class':'form-control'}))
	
	
class RegisterForm(ModelForm):
	class Meta:
		model = User
		fields = ['username', 'email' , 'first_name' , 'last_name' , 'password']
		widgets = {
			'username': forms.TextInput(attrs={'class': 'form-control'}),
			'email': forms.TextInput(attrs={'class': 'form-control'}),
			'first_name': forms.TextInput(attrs={'class': 'form-control'}),
			'last_name': forms.TextInput(attrs={'class': 'form-control'}),
			'password': forms.PasswordInput(attrs={'class': 'form-control'}),
		}


class QuestionForm(forms.Form):
	text = forms.CharField(label = "Text",max_length = 140 , widget = forms.TextInput(attrs = {'class':'form-control'}) )
	explanation = forms.CharField(label = "Explanation",max_length = 1000 , widget = forms.Textarea(attrs = {'class':'form-control'}))
	topic_choices = (
		('topic1' , 'topic1'),
		('topic2' , 'topic2'),
		)
	interests = forms.MultipleChoiceField(label = "Tags",required = True , widget = forms.CheckboxSelectMultiple(attrs = {'class':'form-check-inline'}) 
		, choices = topic_choices)

class AnswerForm(forms.Form):
	text = forms.CharField(label = "Answer" , max_length = 300 , widget = forms.Textarea(attrs = {'class':'form-control'}) )
	