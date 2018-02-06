from contact_form.models import ContactForm
from contact_form.serializers import ContactFormSerializer
from django.conf import settings

import requests
import json
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

class ContactFormCreate(generics.ListCreateAPIView):
	queryset = ContactForm.objects.all()
	serializer_class = ContactFormSerializer

	def create(self, request, *args, **kwargs):
		try:
			g_recaptcha_response = request.data['g_recaptcha_response']
		except KeyError:
			return Response({'captcha_error': 'Please complete the captcha.'},
			status = status.HTTP_400_BAD_REQUEST)
		r = requests.post(settings.GR_CAPTCHA_URL, {
		'secret': settings.GR_CAPTCHA_SECRET_KEY,
		'response': g_recaptcha_response
		})
		if not json.loads(r.content.decode())['success']:
			return Response(
				{'captcha_error': 'Please complete the captcha.'},
				status = status.HTTP_400_BAD_REQUEST
			)

		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
