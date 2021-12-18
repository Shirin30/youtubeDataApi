from django.contrib.auth import views as auth_views
from . import views
from .views import *
from django.urls import path


app_name = 'youtubesearch'

urlpatterns = [
    path('search/', views.YoutubeDataAPI.as_view(),name='Get Youtube Data'),
    path('filterbydate/',views.FilterByDateAPIView.as_view())
]

"""
localhost:8000/youtubesearchapi/search/ is the api url where we can get all 
the youtube videos we have stored in backend after fetching from youtube data 
api v3 displayed as a paginated response.

localhost:8000/youtubesearchapi/filterbydate/ is the api url which will fetch the
filtered data by date displayed as a paginated response.

"""