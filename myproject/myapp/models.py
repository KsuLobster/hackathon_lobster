from django.db import models
from django.contrib.auth.models import User #デフォルトにあるものを使用

# Create your models here.
"""
各モデルは models.Model クラスを継承して定義
モデルのフィールドは、
models.CharField, models.TextField, models.DateTimeField
などのようにDjangoが提供するフィールドクラスを利用して定義
外部キーを定義する際には models.ForeignKey を使用

on_delete=models.CASCADE は、親モデルが削除されたときに、
それに関連する子モデルも削除されるように指定
"""

class Book(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.title

class Subscription(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	subscription_type = models.CharField(max_length=255)
	start_date = models.DateField()
	end_date = models.DateField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.subscription_type