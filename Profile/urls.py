from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
	path('notifications/', views.notif , name = "notif"),
	path('saved/' , views.saved , name = "saved"),
	path('answered/' , views.answered, name ="answered"),
	path('interests/', views.add_interests , name = "add_interests"),
	path('' , views.index , name = "profile"),	
]