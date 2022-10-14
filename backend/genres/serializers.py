from drf_writable_nested.mixins import UniqueFieldsMixin
from rest_framework import serializers
from .models import Genre


class GenreSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
