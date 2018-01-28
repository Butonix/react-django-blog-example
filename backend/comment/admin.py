from django.contrib import admin
from .models import Comment, CommentReply

admin.site.register(Comment)
admin.site.register(CommentReply)
