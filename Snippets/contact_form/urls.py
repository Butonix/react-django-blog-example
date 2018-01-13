from django.conf.urls import url 

from contact_form.views import ContactFormCreate 

urlpatterns = [
	url(r"^$", ContactFormCreate.as_view(), name='contact-form'),
]