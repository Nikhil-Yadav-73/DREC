from rest_framework import serializers
from base.models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'user',
            'text',
            'created_at',
        ]
        