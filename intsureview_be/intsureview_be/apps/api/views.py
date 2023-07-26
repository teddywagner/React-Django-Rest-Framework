from django.contrib.auth.models import User, Group
from intsureview_be.apps.api.models import Form
from rest_framework import viewsets
from rest_framework import permissions
from intsureview_be.apps.api.serializers import UserSerializer, GroupSerializer, FormSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


# I implemented a GET and POST
# Working with forms, I would not expect a user submitted form to be immutable for consistency
# I would implement PUT and DELETE in a separate view for admin purposes that 
# would not be exposed to the user and would leverage a primary key and authentication
# NOTE: endpoints tested rigorously with Postman
@api_view(["GET", "POST"])
def form_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == "GET":
        forms = Form.objects.all()
        serializer = FormSerializer(forms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = FormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        