import random

from rest_framework.response import Response
from rest_framework.views import APIView

from predict.models import SampleFile
from predict.serializers import SampleFileSerializer
from .backend import finalPredict


def get_previous_probabilities():
    return [{'id': random.randint(1, 100), 'probability': random.uniform(0, 1)} for i in range(100)]


def get_predictions(serializer_inst, prediction_type):
    sample_file_obj = SampleFile.objects.get(pk=serializer_inst.data['id'])
    file_path = sample_file_obj.sample_file.path
    return finalPredict.returnPredicted(prediction_type, file_path)


class PredictView(APIView):
    def get(self, request):
        inferred_probabilities = get_previous_probabilities()
        return Response(inferred_probabilities)

    def post(self, request):
        ser = SampleFileSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            # send the path to function
            data = get_predictions(ser, request.data['prediction_type'])
            status_code = 200
        else:
            data = {
                'error': 'Wrong data'
            }
            status_code = 400
        return Response(data, status=status_code)
