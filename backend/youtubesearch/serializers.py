from rest_framework import serializers
from .models import YoutubeData

# making class YoutubeDataSeializer, and declaring the fields for our serialized data.

class YoutubeDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = YoutubeData
        fields = ['id', 'title', 'description','publishedAt','img_url']