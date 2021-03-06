from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete = models.CASCADE,
		related_name = 'profile')
	slug = models.SlugField(max_length = 255, blank = True)
	bio = models.TextField(blank=True, default="")
	location = models.CharField(max_length = 50, blank = True, default="")
	full_name = models.CharField(max_length= 150, blank = True, default="")
	user_image = models.ImageField(upload_to='profile_images', blank=True, null=True, default = '/profile_images/pr_image.png')

	def __str__(self):
		return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		UserProfile.objects.create(user = instance, slug = instance.username.lower())

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	instance.profile.save()
