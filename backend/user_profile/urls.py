from django.conf.urls import url

from user_profile.views import UserList, UserDetail

urlpatterns = [
	url(r"^$", UserList.as_view(), name='user-list'),
	url(r"(?P<slug>[-\w]+)/$", UserDetail.as_view(), name='user-detail'),

]
