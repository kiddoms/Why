from django.shortcuts import render
from django.http import HttpResponseRedirect , HttpResponse
from django.contrib.auth.decorators import login_required
from .forms import InterestForm
from .models import Interests , Save
from django.contrib.auth.models import User
from home.models import Question , Answer , up_notif_a , down_notif_a , up_notif_q , down_notif_q , answer_notif
# Create your views here.

@login_required
def index(request):
	user = User.objects.get(username = request.user)
	


	ask_questions = Question.objects.filter(user = user).order_by('-creation_date')
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
	answered_question_count = answer_questions.count()
	ask_questions = Question.objects.filter(user = user).order_by('-creation_date')
	question_id2 = set()
	for q in ask_questions:
		question_id2.add(q.id)
	answer_count= Answer.objects.filter(question_id__in = question_id2).count()
	question_count = ask_questions.count()
	return render(request , "Profile/answered.html" , {'answer_q':answer_questions ,'answered_question_count':answered_question_count, 
							'answer_count':answer_count , 'question_count':question_count ,})


@login_required
def saved(request):
	user = User.objects.get(username = request.user)
	saves = Save.objects.filter(user = user)
	question_id = set()
	for save in saves:
		question_id.add(save.question_id)
	save_questions = Question.objects.filter(id__in = question_id)
	saved_question_count = save_questions.count()
	ask_questions = Question.objects.filter(user = user).order_by('-creation_date')
	question_id2 = set()
	for q in ask_questions:
		question_id2.add(q.id)
	answer_count= Answer.objects.filter(question_id__in = question_id2).count()
	question_count = ask_questions.count()
	return render(request , "Profile/saved.html" ,{'save_q':save_questions , 
					'savec_question_count':saved_question_count , 'user':user , 'answer_count':answer_count , 'question_count':question_count ,} )





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


@login_required
def notif(request):
	user = User.objects.get(username = request.user)
	q_notif_up = up_notif_q.objects.filter(user = user).filter(read = False)
	for notif in q_notif_up:
		notif.read = True
		notif.save()

	q_notif_down = down_notif_q.objects.filter(user = user).filter(read = False)
	for notif in q_notif_down:
		notif.read = True
		notif.save()
	a_notif_up = up_notif_a.objects.filter(user = user).filter(read = False)
	for notif in a_notif_up:
		notif.read = True
		notif.save()

	a_notif_down = down_notif_a.objects.filter(user = user).filter(read = False)
	for notif in a_notif_down:
		notif.read = True
		notif.save()
	answer_notifs = answer_notif.objects.filter(user = user).filter(read = False)
	for notif in answer_notifs:
		notif.read = True
		notif.save()


	return render(request , "Profile/notifications.html",{'q_notif_up':q_notif_up,'q_notif_down':q_notif_down, 
			'a_notif_down':a_notif_down , 'a_notif_up':a_notif_up , 'answer_notif':answer_notifs})



