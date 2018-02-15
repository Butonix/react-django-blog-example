from .models import Comment, CommentReply
from rest_framework import serializers

from user_profile.models import UserProfile

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

class CommentReplySerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model= CommentReply
        fields = ('id',   'user', 'text',  'posted_on',
        'updated_on')


#Methods defined inside ModelSerializer have access to their own context
#You can access current user with self.context['request'].user
class CommentSerializer(serializers.ModelSerializer):
    post = serializers.ReadOnlyField(source='post.id')
    user = serializers.ReadOnlyField(source='user.username')
    comment_replies = CommentReplies(many=True, read_only=True)
    current_user = serializers.SerializerMethodField(method_name='_current_user')
    user_avatar = serializers.SerializerMethodField(method_name='_user_avatar')

    #obj is the object being serialized
    #you can access the obj being serialized with obj.fieldName
    def _current_user(self, obj):
        user = self.context['request'].user
        return user.username

    def _user_avatar(self,obj):
        try:
            user_img = obj.user.profile.user_image
            return str(user_img)
        except AttributeError:
            return ""

    class Meta:
        model = Comment
        fields = ('id','post', 'user', 'text', 'posted_on', 'updated_on',
        'comment_replies', 'current_user', 'user_avatar')
