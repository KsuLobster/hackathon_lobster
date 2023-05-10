from django.shortcuts import render
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Book, Subscription
from .serializers import UserSerializer, BookSerializer, SubscriptionSerializer
from django.db import IntegrityError
from rest_framework.authtoken.models import Token

# Create your views here.
class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.create_user(
                email=request.data["email"],
                password=request.data["password"],
            )
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SigninView(APIView):
    def post(self, request, *args, **kwargs):
        user = authenticate(request, username=request.data["email"], password=request.data["password"])
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "message": "User logged in successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

class BookCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "story generated successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            book = Book.objects.get(id=id, user=request.user)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        books = Book.objects.filter(user=request.user)
        serializer = BookSerializer(books, many=True)
        return Response({"list": serializer.data}, status=status.HTTP_200_OK)

class SubscriptionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, start_date=timezone.now())
            return Response({"message": "subscribed successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)