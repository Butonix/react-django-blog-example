from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

from category.models import Category

class Post(models.Model):
	author = models.ForeignKey(User,
		on_delete = models.CASCADE,
		related_name='posts'
	)
	category = models.ForeignKey(Category,
		on_delete = models.CASCADE,
		related_name='posts')
	title = models.CharField(max_length = 155)
	content = models.TextField()
	content_home_page= models.TextField()
	image_home_page = models.TextField()
	posted_on = models.DateTimeField(auto_now_add=True)
	updated_on = models.DateTimeField(auto_now=True)
	slug = models.SlugField(max_length= 185, unique = True)
	archive = models.CharField(max_length =7, default='')

	class Meta:
		ordering = ['-posted_on']

	def __str__(self):
		return self.title

	def _get_unique_slug(self):
		slug = slugify(self.title)
		unique_slug = slug
		num = 1
		while Post.objects.filter(slug = unique_slug).exists():
			unique_slug = '{}-{}'.format(slug,num)
			num+=1
		return unique_slug

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self._get_unique_slug()
		super().save()
