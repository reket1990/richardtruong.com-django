from django.shortcuts import render
from resume.models import *
from datetime import date

# Create your views here.
def home(request):
	description_entries = Description.objects.all()
	education_entries = Education.objects.all()
	career_entries = Career.objects.all()

	# Calculate age
	today = date.today()
	age = today.year - 1990 - ((today.month, today.day) < (8, 23))

	return render(request, 'resume/home.html', {
		'description_entries': description_entries,
		'age': age,
		'education_entries': education_entries,
		'career_entries': career_entries
	})
