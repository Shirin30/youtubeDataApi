from django.db import models
from django.utils import timezone
from django.utils.timezone import now



class YoutubeData(models.Model):
    title = models.CharField(default="Title not available", max_length=250)
    description = models.CharField(default="Description not available", max_length=600,blank=True,null=True)
    publishedAt = models.DateTimeField(default=timezone.now)
    img_url = models.URLField(max_length=300, unique=True)
    
    