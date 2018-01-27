from django.conf.urls import url, include
from django.contrib import admin


from rest_framework_jwt.views import refresh_jwt_token
from rest_framework.schemas import get_schema_view

urlpatterns = [
    url(r'^schema/$', get_schema_view()),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    url(r'^refresh-token/$', refresh_jwt_token),
    url(r'^registration/', include('rest_auth.registration.urls')),
    url(r'^auth/', include('rest_auth.urls')),
    url(r"^newsletter/", include('newsletter.urls')),
    url(r"^category/", include('category.urls')),
    url(r"^users/", include('user_profile.urls')),
    url(r"^contact/", include('contact_form.urls')),
    url(r"^", include('post.urls', namespace='blog')),
]
