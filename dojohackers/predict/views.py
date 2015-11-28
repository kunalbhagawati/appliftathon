import random

from rest_framework.response import Response
from rest_framework.views import APIView


def get_inferred_probabilities():
    return [
        {'id': random.randint(1, 100), 'probability': random.uniform(0, 1)} for i in range(100)
        ]


class PredictView(APIView):
    def get(self, request):
        inferred_probabilities = get_inferred_probabilities()
        return Response(inferred_probabilities)

    def post(self, request):
        return Response('POST')
