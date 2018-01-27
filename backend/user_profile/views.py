from rest_framework import generics
from django.http import Http404

from user_profile.models import UserProfile 
from user_profile.serializers import UserProfileSerializer 

class UserDetail(generics.RetrieveAPIView):
	serializer_class = UserProfileSerializer
	lookup_field = 'slug'

	def get_object(self, *args, **kwargs):
		try:
			userProfile = UserProfile.objects.get(slug = self.kwargs['slug'])
			return userProfile 
		except UserProfile.DoesNotExist:
			raise Http404 

