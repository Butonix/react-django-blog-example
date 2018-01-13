from rest_framework import serializers

from user_profile.models import UserProfile 

class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile 
		fields = ('id', 'user', 'slug', 'bio', 'location', 'avatar', 'full_name')

