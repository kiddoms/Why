from django.shortcuts import render
from django.http import HttpResponseRedirect , HttpResponse
from django.contrib.auth.decorators import login_required
from .forms import InterestForm
from .models import Interests , Save
from django.contrib.auth.models import User
from home.models import Question , Answer
# Create your views here.

@login_required
def index(request):
	user = User.objects.get(username = request.user)
	


	ask_questions = Question.objects.filter(user = user)
	question_id2 = set()
	for q in ask_questions:
		question_id2.add(q.id)
	answer_count= Answer.objects.filter(question_id__in = question_id2).count()
	question_count = ask_questions.count()

	answers = Answer.objects.filter(user = user)
	question_id1 = set()
	for answer in answers:
		question_id1.add(answer.question_id)
	answer_questions = Question.objects.filter(id__in = question_id1)
	

	return render(request , 'Profile/profile.html',{
							'ask_q':ask_questions , 
							'answer_count':answer_count , 'question_count':question_count , 'user':user})

@login_required
def answered(request):
	user = User.objects.get(username = request.user)
	answers = Answer.objects.filter(user = user)
	question_id1 = set()
	for answer in answers:
		question_id1.add(answer.question_id)
	answer_questions = Question.objects.filter(id__in = question_id1)
	ask_questions = Question.objects.filter(user = user)
	question_id2 = set()
	for q in ask_questions:
		question_id2.add(q.id)
	answer_count= Answer.objects.filter(question_id__in = question_id2).count()
	question_count = ask_questions.count()
	return render(request , "Profile/answered.html" , {'answer_q':answer_questions ,})


@login_required
def saved(request):
	user = User.objects.get(username = request.user)
	saves = Save.objects.filter(user = user)
	question_id = set()
	for save in saves:
		question_id.add(save.question_id)
	save_questions = Question.objects.filter(id__in = question_id)
	ask_questions = Question.objects.filter(user = user)
	question_id2 = set()
	for q in ask_questions:
		question_id2.add(q.id)
	answer_count= Answer.objects.filter(question_id__in = question_id2).count()
	question_count = ask_questions.count()
	return render(request , "Profile/saved.html" ,{'save_q':save_questions ,'answer_count':answer_count , 
					'question_count':question_count , 'user':user} )





@login_required
def add_interests(request):
	if request.method == "POST":
		print("Adelle")
		form = InterestForm(request.POST , prefix = "form")
		if form.is_valid():
			print("hello")
			user = User.objects.get(username = request.user)
			interest = Interests(interest = form.cleaned_data['interest'] , user = user)
			try:
				interest.save()
			except:
				return HttpResponse("cannot select a topic twice")
			return HttpResponseRedirect("/profile/interests/")
		else:
			return HttpResponse("Cannot select a topic twice")

	else:
		form = InterestForm(prefix = "form")
		return render(request , "Profile/interest.html" , {'form':form})


