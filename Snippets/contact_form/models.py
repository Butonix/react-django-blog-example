from django.db import models
from django.core.exceptions import ValidationError

def captcha_validator(value):
	if len(value) < 350:
		raise ValidationError("Please Complete the Captcha first")
	else:
		return value

class ContactForm(models.Model):
	first_name = models.CharField(max_length=60)
	last_name = models.CharField(max_length=60)
	email = models.EmailField()
	website = models.CharField(max_length= 230, blank = True, null=True)
	message = models.TextField()
	captcha = models.TextField(validators=[captcha_validator])
	timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)

	def __str__(self):
		return '{} {}'.format(self.first_name, self.last_name)