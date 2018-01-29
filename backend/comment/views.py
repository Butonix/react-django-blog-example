from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response


from .models import Comment, CommentReply
from .serializers import CommentSerializer, CommentReplySerializer
from .permissions import IsOwnerOrReadOnly
from post.models import Post

class CommentList(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk'])
        serializer.save(user=user, post=post)

    def get_queryset(self):
        print("USER CURRENT", self.request.user.username)
        post_obj = Post.objects.get(pk=self.kwargs['pk'])
        return Comment.objects.filter(post=post_obj)

class CommentDetail(RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'comment_pk'
    lookup_field = 'pk'
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly )

    def get_object(self):
        post_obj = Post.objects.get(pk=self.kwargs['pk'])
        comment_obj = Comment.objects.filter(post=post_obj).get(pk=self.kwargs['comment_pk'])
        return comment_obj

class CommentReplyList(ListCreateAPIView):
    serializer_class = CommentReplySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk'])
        comment  = Comment.objects.get(pk=self.kwargs['comment_pk'])
        serializer.save(user=user, post=post, comment=comment)

    def get_queryset(self):
        post_obj = Post.objects.get(pk=self.kwargs['pk'])
        comment_obj = Comment.objects.get(pk = self.kwargs['comment_pk'])
        return CommentReply.objects.filter(post=post_obj).filter(comment=comment_obj)

class CommentReplyDetail(RetrieveUpdateDestroyAPIView):
    queryset = CommentReply.objects.all()
    serializer_class = CommentReplySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)
