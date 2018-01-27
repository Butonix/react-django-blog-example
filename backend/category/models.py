from django.db import models
from django.utils.text import slugify 

class Category(models.Model):

	name = models.CharField(max_length = 120)
	slug = models.SlugField(max_length = 140, unique=True)

	def __str__(self):
		return self.name

	def _get_unique_slug(self):
		slug = slugify(self.name)
		unique_slug = slug 
		num = 1
		while Category.objects.filter(slug = unique_slug).exists():
			unique_slug = '{}-{}'.format(slug,num)
			num+=1 
		return unique_slug

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = self._get_unique_slug()
		super().save()

	class Meta:
		verbose_name_plural = 'Categories'
		ordering = ['name',]

