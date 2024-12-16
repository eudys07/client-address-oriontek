from django.core.management.base import BaseCommand
from clientapp.kafka_consumer import kafka_consumer

class Command(BaseCommand):
    help = 'Start Kafka Consumer'

    def handle(self, *args, **kwargs):
        kafka_consumer()

