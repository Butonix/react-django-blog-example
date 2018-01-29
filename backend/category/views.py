from post.models import Post
from post.serializers import PostSerializer
from .models import Category
from .serializers import CategorySerializer

from rest_framework import generics
from django.http import Http404


class CategoryList(generics.ListAPIView):
	queryset = Category.objects.all()
	serializer_class = CategorySerializer

class CategoryListFilter(generics.ListAPIView):
	lookup_field = 'slug'
	serializer_class = PostSerializer

	def get_queryset(self, *args, **kwargs):
		posts = Post.objects.filter(category__slug = self.kwargs['slug'])
		# if len(posts) == 0 then, either the slug the user entered is a non exisitng category
		# or the category has no posts
		if len(posts) == 0:
			raise Http404
		return posts
