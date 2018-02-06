from rest_framework import generics
from rest_framework.response import Response
from django.http import Http404

from user_profile.models import UserProfile
from user_profile.serializers import UserProfileSerializer

class PersonalProfile(generics.RetrieveUpdateAPIView):
	serializer_class = UserProfileSerializer

	def get_object(self):
		try:
			return UserProfile.objects.get(user=self.request.user)
		except (UserProfile.DoesNotExist, TypeError) as e:
			raise Http404

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = self.get_serializer(instance)
		return Response(serializer.data)

class UserDetail(generics.RetrieveAPIView):
	serializer_class = UserProfileSerializer
	lookup_field = 'slug'

	def get_object(self, *args, **kwargs):
		try:
			userProfile = UserProfile.objects.get(slug = self.kwargs['slug'])
			return userProfile
		except UserProfile.DoesNotExist:
			raise Http404
