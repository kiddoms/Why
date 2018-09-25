from django.shortcuts import render , redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse , HttpResponseRedirect
from .forms import LoginForm , RegisterForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , login , logout
from django.shortcuts import render

def index(request):
	if request.user.is_authenticated:
		return HttpResponseRedirect('/home/dashboard/')
	if request.method == 'POST':
		form = LoginForm(request.POST , prefix = 'form')
		if form.is_valid():
			print(form.cleaned_data['Username'] , form.cleaned_data['Password'] )
			user = authenticate(request , username = form.cleaned_data['Username'] , password = form.cleaned_data['Password'])
			if user is not None :
				login(request , user)
				return HttpResponseRedirect('/home/dashboard/')
			else:
				return HttpResponse("Invalid Credentials")
		else:
			print(form.errors)
			return HttpResponse("1")
	else:
		form = LoginForm(prefix = 'form')
		return render(request , "home/home.html" , {'form':form})


def register(request):
	if request.user.is_authenticated:
		return HttpResponseRedirect('/home/dashboard/')
	if request.method == 'POST':
		form = RegisterForm(request.POST , prefix = 'form')
		if form.is_valid():
			User.objects.create_user(username = form.cleaned_data['username'] ,
			 						password = form.cleaned_data['password'] , email = form.cleaned_data['email'] , 
			 						first_name = form.cleaned_data['first_name'] , last_name = form.cleaned_data['last_name'])
			return redirect('index')
		else:
			return HttpResponse("Try Again")
	else:
		form = RegisterForm(prefix = 'form')
		return render(request , "home/register.html", {'form':form})


@login_required
def dashboard(request):
	user = User.objects.get(username = request.user)

	return render(request , "home/dashboard.html" , {'user':user})

@login_required
def logout_user(request):
	logout(request)
	return redirect('index')