from rest_framework import serializers

from user_profile.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
	user_image = serializers.ImageField(max_length=None, use_url=True)
	class Meta:
		model = UserProfile
		fields = ('id', 'user', 'slug', 'bio', 'location', 'full_name', 'user_image')
