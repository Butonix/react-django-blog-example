import os
import datetime
from dotenv import load_dotenv
from os.path import join, dirname

from decouple import config

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
#Added one more os.path.dirname because settings is 1 more level nested.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname((os.path.abspath(__file__)))))

ALLOWED_HOSTS = ['testserver', 'localhost',
                 '127.0.0.1', 'google.com', 'google', 'desolate-bastion-14166.herokuapp.com',
                 'www.borislavnfa.com', 'borislavnfa.com',
                 r'https://borislavnfa.com']

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

SECRET_KEY = config("SECRET_KEY")

INSTALLED_APPS = [
    # Base
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',

    # Requirements
    # django-rest-auth
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    # django-rest-socialOauth2
    'oauth2_provider',
    'social_django',
    'rest_framework_social_oauth2',
    'corsheaders',

    # Personal
    'post',
    'newsletter',
    'user_profile',
    'contact_form',
    'comment',
]



MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Make JWT Auth the default authentication mechanism for Django
# Basic Authentication is only suitable for testing.
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # django-rest-auth
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        # django-rest-social-oauth2
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
    )
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True



"""Enables django-rest-auth to use JWT instead of regular tokens."""
REST_USE_JWT = True
SITE_ID = 1

# configure the JWTs to expire after 1 hour, and allow users to refresh near-expiration tokens
# HEADER PREFIX FOR JWT_AUTH is Authorization: `JWT YOUR_TOKEN`
JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=1),
    'JWT_ALLOW_REFRESH': True,
}

# Used for the Email login at http://127.0.0.1:8000/auth/login/
AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend", # Needed to login by username in Django admin, regardless of `allauth`
    "allauth.account.auth_backends.AuthenticationBackend", # `allauth` specific authentication methods, such as login by e-mail
    'rest_framework_social_oauth2.backends.DjangoOAuth2', # `django-social-oauth2` specific methods, such as facebook/google login
    'social_core.backends.google.GoogleOAuth2',  # for Google authentication
    #'social_core.backends.facebook.FacebookOAuth2',  # for Facebook authentication
)


"""Cors Header issues settings"""

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
    'localhost:3001',
    'react-front.s3-website-us-east-1.amazonaws.com',
    'www.borislavnfa.com',
    r'https://borislavnfa.com',
    'borislavnfa.com',
    r'https://borislavnfa.com/'

)

"""DJANGO ALL AUTH SETTINGS FOR EMAIL LOGIN"""
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' # temporary fix of a package issue
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
#ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
#for auth/password/change/ django-rest api endpoint
OLD_PASSWORD_FIELD_ENABLED = True
"""
    GOOGLE RECAPTCHA SETTINGS
"""
GR_CAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify'
GR_CAPTCHA_SECRET_KEY = config('GR_CAPTCHA_SECRET_KEY')

"""
    Google Authentication settings
"""
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = config('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = config(
    "SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET")

"""
    DJANGO OAUTH TOOLKIT EXPIRATION SECONDS  - DEFAULT IS 36000 WHICH IS 10 hours
    (converted access token from a social login backend expiration time)
"""
OAUTH2_PROVIDER = {
    'ACCESS_TOKEN_EXPIRE_SECONDS': 36000,
}
