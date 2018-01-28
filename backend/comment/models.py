from django.db import models
from django.contrib.auth.models import User

from post.models import Post

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-posted_on',)

    def __str__(self):
        return str(self.text)

class CommentReply(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment_replies")
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_replies')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_replies')
    text = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural="Comment Replies"

    def __str__(self):
        return str(self.text)
