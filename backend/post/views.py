from post.models import Post
from post.serializers import PostSerializer
from django.db.models import Q
from django.http import Http404

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class StandardPostPagination(PageNumberPagination):
    page_size = 4
    max_page_size = 500

class PostListPaginated(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class =  StandardPostPagination

    def get_queryset(self):
        return Post.objects.all().select_related('author')

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    #if there is a queryparam in the request filter based on it
    #else return all posts
    def get_queryset(self):
        query_param = self.request.query_params.get('q', None)
        if query_param is not None:
            queryset = Post.objects.filter(
                Q(title__icontains=query_param) |
                Q(author__username__icontains=query_param) |
                Q(archive__icontains=query_param) |
                Q(category__icontains=query_param)
            ).select_related('author')
            if queryset.count() > 0:
                return queryset
            else:
                return Post.objects.all().select_related('author')
        return Post.objects.all().select_related('author')


# The slug API endpoint is used so I can make a get request
# based on the url pathname with react router
class PostDetailSlug(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'result': serializer.data, 'total_post_count': Post.objects.count()})


# The PK API endpoint is used so I can navigate previous/next Post
# Inside a PostDetail
class PostDetailPk(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'result': serializer.data, 'total_post_count': Post.objects.count()})
