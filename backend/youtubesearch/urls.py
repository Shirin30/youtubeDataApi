from django.contrib.auth import views as auth_views
from . import views
from .views import *
from django.urls import path


app_name = 'youtubesearch'

urlpatterns = [
    path('search/', views.YoutubeDataAPI.as_view(),name='Get Youtube Data'),
    path('filterbydate/',views.FilterByDateAPIView.as_view())
]