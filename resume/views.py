from django.shortcuts import render
from resume.models import *

# Create your views here.
def home(request):
	description_entries = Description.objects.all()
	education_entries = Education.objects.all()

	return render(request, 'resume/home.html', {'description_entries': description_entries, 'education_entries': education_entries})