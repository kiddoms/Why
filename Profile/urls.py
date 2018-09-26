from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
	path('interests/', views.add_interests , name = "add_interests"),
	path('' , views.index , name = "profile"),	
]