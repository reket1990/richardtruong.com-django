from __future__ import unicode_literals

from django.db import models
from django.contrib import admin

# Create your models here.
class Education(models.Model):
	name = models.CharField(max_length=50)
	location = models.CharField(max_length=50)
	start_date = models.CharField(max_length=20)
	end_date = models.CharField(max_length=20)
	description = models.CharField(max_length=100)
	def __unicode__(self):
		return self.name

admin.site.register(Education)