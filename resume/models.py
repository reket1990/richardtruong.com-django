from __future__ import unicode_literals

from django.db import models
from django.contrib import admin

# Create your models here.
class Description(models.Model):
	name = models.CharField(max_length=50)
	description = models.CharField(max_length=100)
	def __unicode__(self):
		return self.name

class Education(models.Model):
	name = models.CharField(max_length=50)
	location = models.CharField(max_length=50)
	start_date = models.CharField(max_length=20)
	end_date = models.CharField(max_length=20)
	degree = models.CharField(max_length=100)
	description = models.TextField(max_length=1000)
	display = models.BooleanField()
	def __unicode__(self):
		return self.name

class Career(models.Model):
	name = models.CharField(max_length=50)
	location = models.CharField(max_length=50)
	start_date = models.CharField(max_length=20)
	end_date = models.CharField(max_length=20)
	title = models.CharField(max_length=100)
	description = models.TextField(max_length=1000)
	display = models.BooleanField()
	def __unicode__(self):
		return self.name

admin.site.register(Description)
admin.site.register(Education)
admin.site.register(Career)
