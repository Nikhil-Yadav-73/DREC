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
        fields = ['id', 'name'] 

class ItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image = serializers.ImageField(required=False)

    class Meta:
        model = Item
        fields = [
            'id', 'category', 'name', 'description', 'price',
            'image', 'video', 'created_at', 'quantity',
            'material', 'size'
        ]
    
    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category, created = Category.objects.get_or_create(**category_data)
        item = Item.objects.create(category=category, **validated_data)
        return item
    
    # def update(self, instance, validated_data):
    #     category_data = validated_data.pop('category', None)
        
    #     if category_data:
    #         category_serializer = CategorySerializer(instance.category, data=category_data)
    #         if category_serializer.is_valid():
    #             category_serializer.save()
    #         else:
    #             raise serializers.ValidationError(category_serializer.errors)

    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.image = validated_data.get('image', instance.image)
    #     instance.video = validated_data.get('video', instance.video)
    #     instance.quantity = validated_data.get('quantity', instance.quantity)
    #     instance.material = validated_data.get('material', instance.material)
    #     instance.size = validated_data.get('size', instance.size)
        
    #     instance.save()
    #     return instance