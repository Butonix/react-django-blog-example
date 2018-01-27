from django.db import models
from django.core.exceptions import ValidationError

def email_validator(value):
	if SubscribedEmails.objects.filter(email = value).exists():
		raise ValidationError("This Email Is already Registered")
	else:
		return value

class SubscribedEmails(models.Model):
	email = models.EmailField(validators=[email_validator])
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.email