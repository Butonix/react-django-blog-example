from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response


from .models import Comment, CommentReply
from .serializers import CommentSerializer, CommentReplySerializer
from .permissions import IsOwnerOrReadOnly

class CommentList(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        user = self.request.user
        post = request.data['post']
        serializer.save(user=user, post=post)

class CommentDetail(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly )


class CommentReplyList(ListCreateAPIView):
    queryset = CommentReply.objects.all()
    serializer_class = CommentReplySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        user = self.request.user
        post = request.data['post']
        serializer.save(user=user, post=post)

class CommentReplyDetail(RetrieveUpdateDestroyAPIView):
    queryset = CommentReply.objects.all()
    serializer_class = CommentReplySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)
