import json
from confluent_kafka import Consumer
from django.conf import settings
from .models import Client, Address

def kafka_consumer():
    consumer = Consumer({
        'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
        'group.id': 'client-group',
        'auto.offset.reset': 'earliest'
    })
    consumer.subscribe([settings.KAFKA_TOPIC])

    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue

        try:
            event = json.loads(msg.value().decode('utf-8'))
            if event['event'] == 'CLIENT_CREATED':
                Client.objects.create(id=event['clientId'], name=f"Client {event['clientId']}")
            elif event['event'] == 'ADDRESS_CREATED':
                client = Client.objects.get(id=event['clientId'])
                Address.objects.create(client=client, id=event['addressId'], description=f"Address {event['addressId']}")
        except Exception as e:
            print(f"Error processing message: {e}")

    consumer.close()

