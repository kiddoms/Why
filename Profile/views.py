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
	saves = Save.objects.filter(user = user)
	question_id = set()
	for save in saves:
		question_id.add(save.question_id)
	save_questions = Question.objects.filter(id__in = question_id)
	save_answers = Answer.objects.filter(question_id__in = question_id)


	ask_questions = Question.objects.filter(user = user)
	question_id2 = set()
	for q in ask_questions:
		question_id2.add(q.id)
	ask_answers = Answer.objects.filter(question_id__in = question_id2)

	answers = Answer.objects.filter(user = user)
	question_id1 = set()
	for answer in answers:
		question_id1.add(answer.question_id)
	answer_questions = Question.objects.filter(id__in = question_id1)
	

	return render(request , 'Profile/profile.html',{'save_q':save_questions ,
							'ask_q':ask_questions , 'answer_q':answer_questions ,
							'answer_a':answers , 'save_a':save_answers,
							'ask_a':ask_answers})

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


