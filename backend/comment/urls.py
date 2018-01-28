from django.conf.urls import url

from .views import CommentList, CommentDetail, CommentReplyList, CommentReplyDetail

urlpatterns = [
    url(r"^comments/$", CommentList.as_view(), name='comment-list'),
    url(r"^comments/(?P<pk>[0-9]+)/$",CommentDetail.as_view(), name='comment-detail'),
    url(r"^commentreplies/$", CommentReplyList.as_view(), name='comment-reply-list'),
    url(r"^commentreplies/(?P<pk>[0-9]+)/$", CommentReplyDetail.as_view(), name='comment-reply-detail')
]
