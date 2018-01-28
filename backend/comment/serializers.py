from .models import Comment, CommentReply
from rest_framework import serializers

class CommentReplies(serializers.RelatedField):
    #comment_replies is an array of class instances
    #for each class instance I return the below fields
    def to_representation(self, value):
        return {
        'id': value.id,
        'user': value.user.username,
        'text': value.text,
        'posted_on': value.posted_on,
        'updated_on': value.updated_on
        }

#Methods defined inside ModelSerializer have access to their own context
#You can access context with self.context['request'].user
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    comment_replies = CommentReplies(many=True, read_only=True)
    current_user = serializers.SerializerMethodField(method_name='_current_user')

    #obj is the object being serialized
    #you can access the obj being serialized with obj.fieldName
    def _current_user(self, obj):
        user = self.context['request'].user
        return user.username

    class Meta:
        model = Comment
        fields = ('id', 'user', 'text', 'posted_on', 'updated_on',
        'comment_replies', 'current_user')

class CommentReplySerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model= CommentReply
        fields = ('id', 'comment', 'user', 'text',  'posted_on',
        'updated_on')
