from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from drf_writable_nested.mixins import UniqueFieldsMixin, NestedUpdateMixin
from genres.serializers import GenreSerializer
from instruments.serializers import InstrumentSerializer
from .models import ExperienceLevel, UserInstrument, UserProfile, Gender, CommitmentLevel


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


class UserProfileSerializer(NestedUpdateMixin, serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    instruments = UserInstrumentSerializer(source='userinstruments', many=True)
    gender = GenderSerializer()
    level_of_commitment = CommitmentLevelSerializer()

    class Meta:
        model = UserProfile
        fields = ('id', 'first_name', 'last_name', 'gender', 'birth_date', 'zipcode', 'profile_picture_url',
                    'join_date', 'years_playing', 'level_of_commitment', 'seeking', 'instruments', 'genres')
