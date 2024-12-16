from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Address(models.Model):
    client = models.ForeignKey(Client, related_name="addresses", on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return f"{self.client.name} - {self.description}"
