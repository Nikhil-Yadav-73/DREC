from rest_framework import serializers
from base.models import Note, Item, Category

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'user',
            'text',
            'created_at',
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']  # Include 'id' if you want to expose the primary key

class ItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Item
        fields = [
            'id', 'category', 'name', 'description', 'price',
            'image', 'video', 'created_at', 'quantity',
            'material', 'size'
        ]