from django.conf.urls import url 
from newsletter.views import SubscribedEmailsList, SubscribedEmailsDetail

urlpatterns = [
	url(r"^$", SubscribedEmailsList.as_view(), name='email-list'),
	url(r"^(?P<pk>[0-9]+)/$", SubscribedEmailsDetail.as_view(), name='email-detail'),
]