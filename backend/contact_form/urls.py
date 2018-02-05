from django.conf.urls import url

from contact_form.views import ContactFormCreate

urlpatterns = [
	url(r"^contact/$", ContactFormCreate.as_view(), name='contact-form'),
]
