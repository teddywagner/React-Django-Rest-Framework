from django.contrib.auth.models import User, Group
from intsureview_be.apps.api.models import Form
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]

# Implemented a serializer for the Form model to be used in the form_list view
class FormSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Form
        fields = ["first_name", "last_name", "phone_number", "move_in_date", "flexible"]