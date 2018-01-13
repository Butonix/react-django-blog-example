from rest_framework import serializers

from newsletter.models import SubscribedEmails

class SubscribedEmailsSerializer(serializers.ModelSerializer):
	class Meta: 
		model = SubscribedEmails 
		fields = ('id','email', 'timestamp')
