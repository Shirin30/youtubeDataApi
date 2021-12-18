from rest_framework import serializers
from .models import YoutubeData



class YoutubeDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = YoutubeData
        fields = ['id', 'title', 'description','publishedAt','img_url']