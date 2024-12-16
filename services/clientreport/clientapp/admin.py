from django.contrib import admin
from .models import Client, Address

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'description')