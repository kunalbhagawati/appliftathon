from rest_framework import serializers

from predict.models import SampleFile


class SampleFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SampleFile
