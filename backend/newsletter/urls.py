from django.conf.urls import url
from newsletter.views import SubscribedEmailsList, SubscribedEmailsDetail

urlpatterns = [
	url(r"^newsletter/$", SubscribedEmailsList.as_view(), name='email-list'),
	url(r"^newsletter/(?P<pk>[0-9]+)/$", SubscribedEmailsDetail.as_view(), name='email-detail'),
]
