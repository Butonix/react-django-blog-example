from post.models import Post 

from rest_framework import serializers 

class PostSerializer(serializers.ModelSerializer):
	author = serializers.ReadOnlyField(source='author.username')
	category = serializers.ReadOnlyField(source='category.slug')

	class Meta:
		model = Post 
		fields = ('id', 'author', 'category','title', 'content', 'posted_on', 'updated_on',
		 'image_home_page', 'content_home_page','archive', 'slug')