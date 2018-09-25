from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm


class LoginForm(forms.Form):
	Username = forms.CharField()
	Password = forms.CharField()
	
	
class RegisterForm(ModelForm):
	class Meta:
		model = User
		fields = ['username', 'email' , 'first_name' , 'last_name' , 'password']
