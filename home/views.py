from django.shortcuts import render , redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse , HttpResponseRedirect
from .forms import LoginForm , RegisterForm  , QuestionForm , AnswerForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , login , logout
from django.shortcuts import render
from .models import Question , Answer , Vote_q , Vote_a , up_notif_q , down_notif_q , up_notif_a , down_notif_a , answer_notif
from Profile.models import Save , Interests
import re

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
def dashboard(request ):
	user = User.objects.get(username = request.user)
	interests  = Interests.objects.filter(user = user )
	list1 = []
	for interest in interests:
		list1.append(interest.interest)
		#print(list1 , l1)
	l1 = set(list1)
	question_id = set()
	questions = Question.objects.all().exclude(user = user).order_by('-creation_date')
	for question in questions:
		x = list(question.interests.split(" "))
		print(x)
		l2 = set(x)
		if l1.intersection(l2):
			question_id.add(question.id)
	if question_id:
		questions = Question.objects.filter(id__in = question_id).order_by('-creation_date')
	else:
		for question in questions:
			 question_id.add(question.id)
	answers = Answer.objects.filter(question_id__in = question_id)
	ups = Vote_q.objects.filter(question_id__in = question_id).filter(upvote = True)
	downs = Vote_q.objects.filter(question_id__in = question_id).filter(downvote = True)
	for question in questions:
		count = 0
		for up in ups:
			if up.question_id == question.id:
				count += 1
		question.upvote = count
		question.save()


	for question in questions:
		count = 0
		for down in downs:
			if down.question_id == question.id:
				count += 1
		question.downvote = count
		question.save()
	answer_id = set()
	for answer in answers:
		answer_id.add(answer.id)
	ups = Vote_a.objects.filter(answer_id__in = answer_id).filter(upvote = True)
	downs = Vote_a.objects.filter(answer_id__in = answer_id).filter(downvote = True)
	for answer in answers:
		count = 0
		for up in ups:
			if up.answer_id == answer.id:
				count += 1
		answer.upvote = count
		answer.save()


	for answer in answers:
		count = 0
		for down in downs:
			if down.answer_id == answer.id:
				count += 1
		answer.downvote = count
		answer.save()

	a = answer_notif.objects.filter(user = user).filter(read = False).count()
	b = up_notif_q.objects.filter(user = user).filter(read = False).count()
	c = down_notif_q.objects.filter(user = user).filter(read = False).count()
	d = up_notif_a.objects.filter(user = user).filter(read = False).count()
	e = down_notif_a.objects.filter(user = user).filter(read = False).count()
	return render(request , "home/dashboard.html" , {'user':user , 'questions':questions ,'answers':answers ,'unread':(a+b+c+d+e)})


@login_required
def logout_user(request):
	logout(request)
	return redirect('index')

@login_required
def ask(request):
	user = User.objects.get(username = request.user)
	if request.method == 'POST':
		form = QuestionForm(request.POST , prefix = "form")
		if form.is_valid():
			print(type(form.cleaned_data['interests']))

			x = re.sub("[\[\]',]","",str(form.cleaned_data['interests']))
			question = Question(text = form.cleaned_data['text'] , explaination = form.cleaned_data['explanation'] 
								, user = user , interests = x)
			print(question.interests)
			question.save()
			return HttpResponseRedirect('/home/dashboard/')
		
	else:
		a = answer_notif.objects.filter(user = user).filter(read = False).count()
		b = up_notif_q.objects.filter(user = user).filter(read = False).count()
		c = down_notif_q.objects.filter(user = user).filter(read = False).count()
		d = up_notif_a.objects.filter(user = user).filter(read = False).count()
		e = down_notif_a.objects.filter(user = user).filter(read = False).count()
		form = QuestionForm(prefix = 'form')
		return render(request , 'home/ask.html' , {'form':form,'unread':(a+b+c+d+e)})

@login_required
def answer(request , question_id):
	question = Question.objects.get(id = question_id)
	user = User.objects.get(username = request.user)
	answers = Answer.objects.filter(question_id = question.id).order_by('-creation_date')
	if request.method == "POST":
		form = AnswerForm(request.POST , prefix = 'form')
		if form.is_valid():
			answer = Answer(user = user , text = form.cleaned_data['text']  , question = question)
			try:
				answer.save()
			except:
				return HttpResponse("you cannot answer twice")
			notif = answer_notif (user = question.user , answerer = request.user , qustion = question)
			notif.save()
			question.answer_count += 1
			question.save()
			return redirect("dashboard")

	else:
		form = AnswerForm(prefix = 'form')
		a = answer_notif.objects.filter(user = user).filter(read = False).count()
		b = up_notif_q.objects.filter(user = user).filter(read = False).count()
		c = down_notif_q.objects.filter(user = user).filter(read = False).count()
		d = up_notif_a.objects.filter(user = user).filter(read = False).count()
		e = down_notif_a.objects.filter(user = user).filter(read = False).count()
		return render(request , "home/answer.html" , {'form':form  , 'question':question , 'answers':answers,'unread':(a+b+c+d+e)})

@login_required
def question_upvote(request , question_id):
	question = Question.objects.get(id = question_id)
	user = User.objects.get(username = request.user)
	try:
		up = Vote_q.objects.get(question = question , user = user)
	except:
		up = Vote_q(question = question , user = user )
	if up.upvote :
		up.upvote = False
	else:
		up.upvote = True
		up.downvote = False
		notif = up_notif_q(user = question.user , voter = request.user , question = question)
		notif.save()
	up.save()
	return HttpResponseRedirect("/home/dashboard/")

@login_required
def question_downvote(request , question_id):
	question = Question.objects.get(id = question_id)
	user = User.objects.get(username = request.user)
	try:
		down = Vote_q.objects.get(question = question , user = user)
	except:
		down = Vote_q(question = question , user = user )
	if down.downvote:
		down.downvote = False
	else:
		down.upvote = False	
		down.downvote = True
		notif = down_notif_q(user = question.user , voter = request.user , question = question)
		notif.save()
	
	down.save()
	return HttpResponseRedirect("/home/dashboard/")


@login_required
def answer_upvote(request , answer_id):
	answer = Answer.objects.get(id = answer_id)
	user = User.objects.get(username = request.user)
	try:
		up = Vote_a.objects.get(answer  = answer , user = user)
	except:
		up = Vote_a(answer = answer , user = user )
	if up.upvote :
		up.upvote = False
	else:
		up.upvote = True
		up.downvote = False
		notif = up_notif_a(user = answer.user , voter = request.user , answer = answer)
		notif.save()
	up.save()
	return HttpResponseRedirect("/home/dashboard/")

@login_required
def answer_downvote(request , answer_id):
	answer = Answer.objects.get(id = answer_id)
	user = User.objects.get(username = request.user)
	try:
		down = Vote_a.objects.get(answer = answer , user = user)
	except:
		down = Vote_a(answer = answer , user = user )
	if down.downvote:
		down.downvote = False
	else:
		down.upvote = False	
		down.downvote = True
		notif = down_notif_a(user = answer.user , voter = request.user , answer = answer)
		notif.save()
	
	down.save()
	return HttpResponseRedirect("/home/dashboard/")

@login_required
def save(request , question_id):
	question = Question.objects.get(id = question_id)
	user = User.objects.get(username = request.user)
	c =0 
	try:
		save = Save.objects.get(question = question , user = user)
		c=1
	except:
		save = Save(question = question , user = user)
		c=2
	
	if c == 1:
		save.delete()
	elif c==2:
		save.save()

	return HttpResponseRedirect("/home/dashboard/")
