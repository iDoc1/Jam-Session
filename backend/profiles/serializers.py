from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from drf_writable_nested.mixins import UniqueFieldsMixin, NestedUpdateMixin
from cloudstorage.serializers import ProfilePictureSerializer, MusicSampleSerializer
from genres.serializers import GenreSerializer
from instruments.serializers import InstrumentSerializer
from .models import (
    ExperienceLevel,
    UserInstrument,
    UserProfile,
    Gender,
    CommitmentLevel,
    SocialMediaLink
)


class ExperienceLevelSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = ExperienceLevel
        fields = '__all__'


class UserInstrumentSerializer(WritableNestedModelSerializer):
    instrument = InstrumentSerializer()
    experience_level = ExperienceLevelSerializer()

    class Meta:
        model = UserInstrument
        fields = ('instrument', 'experience_level')


class GenderSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'


class CommitmentLevelSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = CommitmentLevel
        fields = '__all__'


class SocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaLink
        fields = ('id', 'user', 'social_media_site', 'social_media_link')
        read_only_fields = ('user',)

    def create(self, validated_data):
        """
        Set user to currently authenticated user
        """
        profile_pic = SocialMediaLink.objects.create(
            user=self.context['request'].user,
            **validated_data
        )
        return profile_pic


class UserProfileSerializer(NestedUpdateMixin, serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    instruments = UserInstrumentSerializer(source='userinstruments', many=True)
    gender = GenderSerializer()
    level_of_commitment = CommitmentLevelSerializer()
    social_media = SocialMediaLinkSerializer(source='socialmedia', many=True, read_only=True)
    music_samples = MusicSampleSerializer(source='user.music_sample', many=True, read_only=True)
    age = serializers.IntegerField(source='get_age', read_only=True)

    try:
        profile_picture = ProfilePictureSerializer(source='user.profile_pic', read_only=True)
    except ObjectDoesNotExist:
        profile_picture = None

    class Meta:
        model = UserProfile
        fields = ('id', 'first_name', 'last_name', 'gender', 'birth_date', 'age', 'zipcode',
                  'profile_picture', 'join_date', 'years_playing', 'level_of_commitment',
                  'seeking', 'instruments', 'genres', 'music_samples', 'social_media')
        read_only_fields = ('join_date',)
