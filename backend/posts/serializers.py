from rest_framework import serializers
from drf_writable_nested.mixins import NestedUpdateMixin
from genres.models import Genre
from genres.serializers import GenreSerializer
from instruments.models import Instrument
from instruments.serializers import InstrumentSerializer
from .models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    user_profile_id = serializers.IntegerField(source='user.user_profile.id', read_only=True)
    user_first_name = serializers.CharField(source='user.user_profile.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.user_profile.last_name', read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'user', 'user_profile_id', 'user_first_name',
                  'user_last_name', 'post', 'content', 'comment_date')
        read_only_fields = ('user', 'comment_date')

    def create(self, validated_data):
        """
        Set the comment user as the currently authenticated user
        """
        comment = Comment.objects.create(
            user=self.context['request'].user,
            **validated_data
        )
        return comment

    def update(self, instance, validated_data):
        """
        Prevent comment_date and post from being updated
        """
        if validated_data.get('comment_date'):
            validated_data.pop('comment_date')

        if validated_data.get('post'):
            validated_data.pop('post')

        return super().update(instance, validated_data)


class PostSerializer(NestedUpdateMixin, serializers.ModelSerializer):
    instruments = InstrumentSerializer(many=True)
    genres = GenreSerializer(many=True)
    comments = CommentSerializer(source='comment', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'seeking', 'content', 'zipcode',
                  'posted_date', 'instruments', 'genres', 'comments')
        read_only_fields = ('user',)

    def create(self, validated_data):
        """
        Set user to currently authenticated user and create Post object
        """
        instruments_data = validated_data.pop('instruments')
        genres_data = validated_data.pop('genres')

        post = Post.objects.create(
            user=self.context['request'].user,
            **validated_data
        )

        for instrument in instruments_data:
            post.instruments.add(Instrument.objects.get(name=instrument['name']))

        for genre in genres_data:
            post.genres.add(Genre.objects.get(genre=genre['genre']))

        return post
