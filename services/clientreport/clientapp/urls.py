from django.urls import path
from .views import ClientReportView

urlpatterns = [
    path('api/v1/client-report', ClientReportView.as_view(), name='client-report'),
]

