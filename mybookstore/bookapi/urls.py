from django.urls import path
from . import views

urlpatterns = [
    path('auth/signup', views.SignupView.as_view(), name='signup'),
    path('auth/signin', views.SigninView.as_view(), name='signin'),
    path('books', views.BookCreateView.as_view(), name='book_create'),
    path('books/<int:id>', views.BookDetailView.as_view(), name='book_detail'),
    path('books', views.BookListView.as_view(), name='book_list'),
    path('subscriptions', views.SubscriptionCreateView.as_view(), name='subscription_create'),
]
