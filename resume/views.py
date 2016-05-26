from django.shortcuts import render
from resume.models import *

# Create your views here.
def home(request):
	education_entries = Education.objects.all()

	return render(request, 'resume/home.html', {'education_entries': education_entries})