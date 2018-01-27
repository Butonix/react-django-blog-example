from rest_framework import generics 

from newsletter.models import SubscribedEmails
from newsletter.serializers import SubscribedEmailsSerializer 

class SubscribedEmailsList(generics.ListCreateAPIView):
	queryset = SubscribedEmails.objects.all()
	serializer_class = SubscribedEmailsSerializer

class SubscribedEmailsDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = SubscribedEmails.objects.all()
	serializer_class = SubscribedEmailsSerializer 
