from django.conf.urls import url 

from user_profile.views import UserDetail

urlpatterns = [
	url(r"(?P<slug>[-\w]+)/$", UserDetail.as_view(), name='user-detail'),

]