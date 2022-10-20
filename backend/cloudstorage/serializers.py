from rest_framework import serializers
from .models import ProfilePicture


class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePicture
        fields = ('id', 'user', 'created_date', 'image_file')
        read_only_fields = ('user', 'created_date',)

    def create(self, validated_data):
        """
        Set user to currently authenticated user
        """
        profile_pic = ProfilePicture.objects.create(
            user=self.context['request'].user,
            **validated_data
        )
        return profile_pic
