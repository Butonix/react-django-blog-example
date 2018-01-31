from rest_framework import serializers

from user_profile.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
	user_image = serializers.ImageField(max_length=None, use_url=True)
	user = serializers.ReadOnlyField(source = 'user.username')
	# current_user = serializers.SerializerMethodField(method_name='_current_user')
	# def _current_user(self, obj):
	# 	user = self.context['request'].user
	# 	return user.id

	class Meta:
		model = UserProfile
		fields = ('id', 'user', 'slug', 'bio', 'location', 'full_name', 'user_image')
