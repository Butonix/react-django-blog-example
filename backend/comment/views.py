from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.http import Http404

from .models import Comment, CommentReply
from .serializers import CommentSerializer, CommentReplySerializer
from .permissions import IsOwnerOrReadOnly
from post.models import Post


from django.db.models import Prefetch


class CommentList(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        user = self.request.user
        try:
            post = Post.objects.get(pk=self.kwargs['pk'])
        except (Post.DoesNotExist):
            raise Http404
        serializer.save(user=user, post=post)

    def get_queryset(self):
        print("USER CURRENT", self.request.user.username)
        try:
            post_obj = Post.objects.get(pk=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise Http404

        return Comment.objects.select_related('user__profile','post').prefetch_related(
        'comment_replies__user').filter(post=post_obj)

class CommentDetail(RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'comment_pk'
    lookup_field = 'pk'
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly )

    def get_object(self):
        try:
            post_obj = Post.objects.get(pk=self.kwargs['pk'])
            comment_obj = Comment.objects.select_related('user__profile','post').prefetch_related(
            'comment_replies__user'
            ).filter(post=post_obj).get(pk=self.kwargs['comment_pk'])
        except (Post.DoesNotExist, Comment.DoesNotExist) as e:
            raise Http404
        return comment_obj

class CommentReplyList(ListCreateAPIView):
    serializer_class = CommentReplySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        user = self.request.user
        try:
            post = Post.objects.get(pk=self.kwargs['pk'])
            comment  = Comment.objects.get(pk=self.kwargs['comment_pk'])
        except (Post.DoesNotExist, Comment.DoesNotExist) as e:
            raise Http404
        serializer.save(user=user, post=post, comment=comment)

    def get_queryset(self):
        try:
            post_obj = Post.objects.get(pk=self.kwargs['pk'])
            comment_obj = Comment.objects.get(pk = self.kwargs['comment_pk'])
        except (Post.DoesNotExist, Comment.DoesNotExist) as e:
            raise Http404
        return CommentReply.objects.select_related('user').filter(post=post_obj,comment=comment_obj)

class CommentReplyDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = CommentReplySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    def get_object(self):
        try:
            comment_obj = CommentReply.objects.get(pk=self.kwargs['pk'])
        except CommentReply.DoesNotExist:
            raise Http404
        return comment_obj
