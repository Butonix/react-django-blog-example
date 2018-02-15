from rest_framework import serializers

from user_profile.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
	user_image = serializers.ImageField(max_length=None, use_url=True, allow_empty_file=True, required=False)
	user = serializers.ReadOnlyField(source = 'user.username')

	class Meta:
		model = UserProfile
		fields = ('user',  'bio', 'location', 'full_name', 'user_image')
