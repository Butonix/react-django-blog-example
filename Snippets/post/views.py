from post.models import Post 
from post.serializers import PostSerializer
from django.db.models import Q


from rest_framework import generics
from rest_framework.pagination import CursorPagination, PageNumberPagination
from rest_framework.response import Response

from django.http import Http404


class CustomCursorPagination(CursorPagination):
	ordering= 'posted_on'
	page_size=1
	page_size_query_param='page_size'
	def get_paginated_response(self, data):
	    return Response({
	        'links': {
	            'next': self.get_next_link(),
	            'previous': self.get_previous_link()
	        },
	        'results': data[0]
	    })

class PostList(generics.ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer 

class PostDetail(generics.ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer 
	lookup_field = 'slug'
	pagination_class = CustomCursorPagination


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
