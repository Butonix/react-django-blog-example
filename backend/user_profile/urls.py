from django.conf.urls import url

from user_profile.views import PersonalProfile, UserDetail

urlpatterns = [
	url(r"^$", PersonalProfile.as_view(), name='personal-profile'),
	url(r"(?P<slug>[-\w]+)/$", UserDetail.as_view(), name='user-detail'),

]
