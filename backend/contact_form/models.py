from django.db import models
from django.core.exceptions import ValidationError

class ContactForm(models.Model):
	first_name = models.CharField(max_length=60)
	last_name = models.CharField(max_length=60)
	email = models.EmailField()
	website = models.CharField(max_length= 230, blank = True, null=True)
	message = models.TextField()
	captcha = models.TextField(blank=True, null=True)
	timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)

	def __str__(self):
		return '{} {}'.format(self.first_name, self.last_name)
