from django.conf.urls import url 
from category.views import CategoryList

urlpatterns = [
	url(r"^(?P<slug>[-\w]+)/$", CategoryList.as_view(), name='category-list'),
]