from django.urls import path
from .views import (
    UserListCreateView,
    UserRetrieveUpdateDestroyView,
    BookListCreateView,
    BookRetrieveUpdateDestroyView,
    SubscriptionListCreateView,
    SubscriptionRetrieveUpdateDestroyView,
)

urlpatterns = [
	# 既存のルーティング
    path("users/", UserListCreateView.as_view(), name="user_list_create"),
    path("users/<int:pk>/", UserRetrieveUpdateDestroyView.as_view(), name="user_retrieve_update_destroy"),
    path("books/", BookListCreateView.as_view(), name="book_list_create"),
    path("books/<int:pk>/", BookRetrieveUpdateDestroyView.as_view(), name="book_retrieve_update_destroy"),
    path("subscriptions/", SubscriptionListCreateView.as_view(), name="subscription_list_create"),
    path("subscriptions/<int:pk>/", SubscriptionRetrieveUpdateDestroyView.as_view(), name="subscription_retrieve_update_destroy"),

	# ユーザー登録用のエンドポイント
    path("auth/signup", UserListCreateView.as_view(), name="signup"),
]
