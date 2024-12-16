from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from .models import Client
from .serializers import ClientSerializer

class ClientReportView(APIView):
    renderer_classes = [JSONRenderer]  # Force JSON response

    def get(self, request):
        clients = Client.objects.prefetch_related('addresses').all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
