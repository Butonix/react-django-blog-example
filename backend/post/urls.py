from post import views
from comment import views as comment_views

from django.conf.urls import url

app_name='blog'

urlpatterns = [
    url(r"^posts/$", views.PostList.as_view(), name='post-list'),
    url(r"^posts/(?P<pk>[0-9]+)/$",
        views.PostDetailPk.as_view(), name="post-detail-pk"),
    url(r"^posts/(?P<pk>[0-9]+)/comments/$",
        comment_views.CommentList.as_view(), name="comment-list"),
    url(r"^posts/(?P<pk>[0-9]+)/comments/(?P<comment_pk>[0-9]+)/$",
        comment_views.CommentDetail.as_view(), name='comment-detail'),
    url(r"^posts/(?P<pk>[0-9]+)/comments/(?P<comment_pk>[0-9]+)/commentreplies/$",
        comment_views.CommentReplyList.as_view(), name='commentreply-list'),
    url(r"^posts/(?P<post_pk>[0-9]+)/comments/(?P<comment_pk>[0-9]+)/commentreplies/(?P<pk>[0-9]+)/$",
        comment_views.CommentReplyDetail.as_view(), name='commentreply-detail'),
    url(r"^posts/(?P<slug>[-\w]+)/$",
        views.PostDetailSlug.as_view(), name="post-detail-slug"),
]
