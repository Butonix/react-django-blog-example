from post import views

from django.conf.urls import url

urlpatterns = [
	url(r"^$", views.PostList.as_view(), name='post-list'),
	url(r"^posts/((?P<query>[-\w]+)/)?$", views.PostListFilter.as_view(), name='post-list-filter'),
	url(r"^(?P<archive>[-0-9]{7})/$", views.PostListArchive.as_view(), name='post-list-archive'),
	url(r"^(?P<pk>[0-9]{1,6})/$",views.PostDetailPk.as_view() , name= "post-detail-pk"),
	url(r"^(?P<slug>[-\w]+)/$",views.PostDetailSlug.as_view() , name= "post-detail-slug"),
]