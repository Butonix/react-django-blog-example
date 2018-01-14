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

	def get_paginated_response(self, data):
	    return Response({
	        'links': {
	            'next': self.get_next_link(),
	            'previous': self.get_previous_link()
	        },
	        'results': data[0]
	    })

	def _reverse_ordering(self,ordering_tuple):
	    def invert(x):
	        return x[1:] if x.startswith('-') else '-' + x
	        print(tuple([invert(item) for item in ordering_tuple]))
	    return tuple([invert(item) for item in ordering_tuple])

	def paginate_queryset(self, queryset, request, view=None):
		self.page_size = self.get_page_size(request)
		if not self.page_size:
			return None

		self.base_url = request.build_absolute_uri()
		self.ordering = self.get_ordering(request, queryset, view)

		self.cursor = self.decode_cursor(request)
		if self.cursor is None:
			# Capture the URL keyword argument the user inserted
			captured_slug = request.resolver_match.kwargs.get('slug')
			# filter the queryset for an instance with a slug = the kwarg
			starter_offset = queryset.filter(slug=captured_slug)
			# set the offset to be the zeroth index of the filtering array.pk - 1
			print(starter_offset[0].pk) 
			(offset, reverse, current_position) = (starter_offset[0].pk-1, False, None)
		else:
			(offset, reverse, current_position) = self.cursor

		if reverse:
			queryset = queryset.order_by(self._reverse_ordering(self.ordering))
		else:
			queryset = queryset.order_by(*self.ordering)

		if current_position is not None:
			order = self.ordering[0]
			is_reversed = order.startswith('-')
			order_attr = order.lstrip('-')
			
			if self.cursor.reverse != is_reversed:
				kwargs = {order_attr + '__lt': current_position}
			else:
				kwargs = {order_attr + '__gt': current_position}
			queryset = queryset.filter(**kwargs)

		results = list(queryset[offset:offset + self.page_size + 1])
		self.page = list(results[:self.page_size])

		if len(results) > len(self.page):
			has_following_position = True
			following_position = self._get_position_from_instance(results[-1], self.ordering)
		else:
			has_following_position = False
			following_position = None
		
		if reverse:
			self.page = list(reversed(self.page))
		
		if reverse:
			self.has_next = (current_position is not None) or (offset > 0)
			self.has_previous = has_following_position
			if self.has_next:
				self.next_position = current_position
			if self.has_previous:
				self.previous_position = following_position
		else:
			self.has_next = has_following_position
			self.has_previous = (current_position is not None) or (offset > 0)
			if self.has_next:
				self.next_position = following_position
			if self.has_previous:
				self.previous_position = current_position

		if (self.has_previous or self.has_next) and self.template is not None:
			self.display_page_controls = True
		
		return self.page


class CustomPageNumberPagination(PageNumberPagination):
	page_size=1
	page_size_query_param='page_size'


class PostList(generics.ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer 

class PostDetail(generics.ListAPIView):
	queryset=Post.objects.all()
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
