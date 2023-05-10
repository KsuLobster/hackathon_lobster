from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group, Permission

# Create your models here.
# ユーザーモデル
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    groups = models.ManyToManyField(Group, related_name="bookapi_user_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="bookapi_user_set", blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

# 絵本モデル
class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # 絵本を作成したユーザーのID
    title = models.CharField(max_length=255)  # 絵本のタイトル
    content = models.TextField()  # 絵本の本文や画像データを保存するためのカラム
    created_at = models.DateTimeField(auto_now_add=True)  # 絵本が作成された日時
    updated_at = models.DateTimeField(auto_now=True)  # 絵本情報が最後に更新された日時

# サブスクリプションモデル
class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # サブスクリプションを登録したユーザーのID
    subscription_type = models.CharField(max_length=255)  # サブスクリプションのプラン名
    start_date = models.DateField()  # サブスクリプションの開始日
    end_date = models.DateField()  # サブスクリプションの終了日
    created_at = models.DateTimeField(auto_now_add=True)  # サブスクリプションが登録された日時
    updated_at = models.DateTimeField(auto_now=True)  # サブスクリプション情報が最後に更新された日時