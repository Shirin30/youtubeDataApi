from django.db import models
from django.utils import timezone
from django.utils.timezone import now

"""
We declare a YoutubeData model that has fields such as video title, 
description of video, date of publishing, and thumbnail url.
These feilds we extract from the youtube data api v3 and store 
it in our database.

"""
class YoutubeData(models.Model):
    title = models.CharField(default="Title not available", max_length=250)
    description = models.CharField(default="Description not available", max_length=600,blank=True,null=True)
    publishedAt = models.DateTimeField(default=timezone.now)
    img_url = models.URLField(max_length=300, unique=True)
    
    