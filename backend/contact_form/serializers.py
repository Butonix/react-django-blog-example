from rest_framework import serializers

from contact_form.models import ContactForm

class ContactFormSerializer(serializers.ModelSerializer):
	class Meta:
		model = ContactForm
		fields = ('id', 'first_name', 'last_name', 'email',
			'website', 'message')
