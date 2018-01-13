from contact_form.models import ContactForm 
from contact_form.serializers import ContactFormSerializer 

from rest_framework import generics 

class ContactFormCreate(generics.ListCreateAPIView):
	queryset = ContactForm.objects.all()
	serializer_class = ContactFormSerializer