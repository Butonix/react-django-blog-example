from django.conf.urls import url
from category.views import CategoryList, CategoryListFilter

urlpatterns = [
	url(r"^$", CategoryList.as_view(), name='category-list'),
	url(r"^(?P<slug>[-\w]+)/$", CategoryListFilter.as_view(), name='category-list-filter'),
]
