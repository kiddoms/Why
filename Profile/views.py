from django.shortcuts import render
from django.http import HttpResponseRedirect , HttpResponse
from django.contrib.auth.decorators import login_required
from .forms import InterestForm
from .models import Interests
from django.contrib.auth.models import User
# Create your views here.

@login_required
def index(request):
	return render(request , 'Profile/profile.html',{})

@login_required
def add_interests(request):
	if request.method == "POST":
		print("Adelle")
		form = InterestForm(request.POST , prefix = "form")
		if form.is_valid():
			print("hello")
			user = User.objects.get(username = request.user)
			interest = Interests(interest = form.cleaned_data['interest'] , user = user)
			interest.save()
			return HttpResponseRedirect("/profile/interests/")
		else:
			return HttpResponse("Cannot select a topic twice")

	else:
		form = InterestForm(prefix = "form")
		return render(request , "Profile/interest.html" , {'form':form})
