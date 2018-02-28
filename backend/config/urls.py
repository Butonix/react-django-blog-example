from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_swagger.views import get_swagger_view

from config.views import django_rest_auth_null, VerifyEmailView

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    url(r"^$", schema_view),
    url(r'^admin/', admin.site.urls),
    url(r'^refresh-token/$', refresh_jwt_token),

    #^auth/ is django rest auth login
    url(r'^auth/', include('rest_auth.urls')),

    #email confirmation rest auth
    url(r'^registration/verify-email/$', VerifyEmailView.as_view(), name='rest_verify_email'),
    url(r'^registration/account-email-verification-sent/$', django_rest_auth_null, name='account_email_verification_sent'),
    url(r'^password-reset/confirm/(?P<uidb64>.*)/(?P<token>.*)/$', django_rest_auth_null, name='password_reset_confirm')
    url(r'^registration/', include('rest_auth.registration.urls')),

    #^sauth/ is social login -django-rest-framework-social-oauth2
    url(r'^sauth/', include('rest_framework_social_oauth2.urls')),

    #Personal apps
    url(r"^", include('newsletter.urls')),
    url(r"^", include('user_profile.urls')),
    url(r"^", include('contact_form.urls')),
    url(r"^", include('post.urls', namespace='blog')),
]

#Browsable API login
urlpatterns += [
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    #Used for Django Rest Auth email RESET!
    url(r'^', include('django.contrib.auth.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
