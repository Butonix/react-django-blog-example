from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin


from rest_framework_jwt.views import refresh_jwt_token
from rest_framework.schemas import get_schema_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^schema/$', get_schema_view()),
    url(r'^refresh-token/$', refresh_jwt_token),
    url(r'^registration/', include('rest_auth.registration.urls')),
    #^sauth/ is social login -django-rest-framework-social-oauth2
    url(r'^sauth/', include('rest_framework_social_oauth2.urls')),
    #^auth/ is django rest auth login
    url(r'^auth/', include('rest_auth.urls')),
    #Personal apps
    url(r"^", include('newsletter.urls')),
    url(r"^category/", include('category.urls')),
    url(r"^profile/", include('user_profile.urls')),
    url(r"^contact/", include('contact_form.urls')),
    url(r"^posts/", include('post.urls', namespace='blog')),
]

#Browsable API login
urlpatterns += [
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    #url(r'^', include('django.contrib.auth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
