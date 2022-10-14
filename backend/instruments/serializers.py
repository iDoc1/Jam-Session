from drf_writable_nested.mixins import UniqueFieldsMixin
from rest_framework import serializers
from .models import Instrument


class InstrumentSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'
