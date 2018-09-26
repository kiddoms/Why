from django.forms import ModelForm
from .models import Interests

class InterestForm(ModelForm):
	class Meta:
		model = Interests
		fields = ['interest']
