from post import views

from django.conf.urls import url

urlpatterns = [
	url(r"^$", views.PostList.as_view(), name='post-list'),
	url(r"^posts/((?P<query>[-\w]+)/)?$", views.PostListFilter.as_view(), name='post-list-filter'),
	url(r"^(?P<archive>[-0-9]{7})/$", views.PostListArchive.as_view(), name='post-list-archive'),
	url(r"^(?P<slug>[-\w]+)/$",views.PostDetail.as_view() , name= "post-detail"),
]