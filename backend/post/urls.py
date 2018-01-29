from post import views
from comment import views as comment_views

from django.conf.urls import url

urlpatterns = [
	url(r"^$", views.PostList.as_view(), name='post-list'),
	url(r"^(?P<pk>[0-9]{1,6})/$",views.PostDetailPk.as_view() , name= "post-detail-pk"),
	url(r"^(?P<pk>[0-9]{1,6})/comments/$",comment_views.CommentList.as_view() , name= "comments-for-post"),
	url(r"^(?P<pk>[0-9]{1,6})/comments/(?P<comment_pk>[0-9]+)/$",comment_views.CommentDetail.as_view(), name='comment-detail'),
	url(r"^posts/((?P<query>[-\w]+)/)?$", views.PostListFilter.as_view(), name='post-list-filter'),
	url(r"^(?P<archive>[-0-9]{7})/$", views.PostListArchive.as_view(), name='post-list-archive'),
	url(r"^(?P<slug>[-\w]+)/$",views.PostDetailSlug.as_view() , name= "post-detail-slug"),
]
