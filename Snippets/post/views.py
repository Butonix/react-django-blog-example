from post.models import Post
from post.serializers import PostSerializer
from django.db.models import Q


from rest_framework import generics

from rest_framework.response import Response

from django.http import Http404

from collections import OrderedDict, namedtuple


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

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


class PostListArchive(generics.ListAPIView):
    lookup_field = 'archive'
    serializer_class = PostSerializer

    def get_queryset(self, *args, **kwargs):
        filtered_posts = Post.objects.filter(archive=self.kwargs['archive'])
        if filtered_posts.count() > 0:
            return filtered_posts
        else:
            raise Http404


class PostListFilter(generics.ListAPIView):
    serializer_class = PostSerializer
    """
	Optionally restricts the returned purchases to a given parameter
	by filtering against a `content`, `title`, `author`, `category`, 
	"""

    def get_queryset(self):
        query_param = self.kwargs['query']
        if query_param:
            queryset = Post.objects.filter(
                Q(title__icontains=query_param) |
                Q(category__name__icontains=query_param) |
                Q(author__username__icontains=query_param)
            )
            if queryset.count() > 0:
                return queryset
            else:
                return Post.objects.all()
        return Post.objects.all()
