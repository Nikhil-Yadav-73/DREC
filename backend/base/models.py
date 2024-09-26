from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return(f"User: {self.user}_____created at: {self.created_at}")