from django.conf import settings
import requests
from rest_framework.generics import ListAPIView
from youtubesearch.models import YoutubeData
from youtubesearch.serializers import YoutubeDataSerializer




class FilterByDateAPIView(ListAPIView):
    queryset = YoutubeData.objects.all()
    serializer_class = YoutubeDataSerializer
    def get_queryset(self):
    
        startdate = self.request.query_params.get('startdate', None)
        enddate = self.request.query_params.get('enddate', None)
        order = self.request.query_params.get('order',None)
        print(startdate,enddate)
        if(order == None or order == 'descending'):
            orderby = '-publishedAt'
        else:
            orderby = 'publishedAt'
        # return self.queryset.filter(publishedAt__range=['2020-12-17','2020-12-18'])
        
        return self.queryset.filter(publishedAt__range=[startdate,enddate]).order_by(orderby)

class YoutubeDataAPI(ListAPIView):
    queryset = YoutubeData.objects.all()
    serializer_class = YoutubeDataSerializer

    def youtube_data_query(self):
        search_url = 'https://www.googleapis.com/youtube/v3/search'

        result = requests.get(search_url,
                              params={
                                  'q': 'marvel',
                                  'part': 'snippet',
                                  'order': 'date',
                                  'type': 'video',
                                  'publishedAfter': '2018-01-01T00:00:00Z',
                                  'maxResults': 10,
                                  'key': settings.YOUTUBE_DATA_API_KEY
                              })

        try:
            result.raise_for_status
            data = result.json()
        except:
            data = None

        print("the data from youtube data v3 api is : \n")
        print(data)

        if data is not None:
            try:
                objects = data["items"]

                for object in objects:
                    object_dictionary = object["snippet"]

                    data = {'title': object_dictionary['title'],
                            'description': object_dictionary['description'],
                            'publishedAt': object_dictionary['publishedAt'],
                            'img_url': object_dictionary['thumbnails']['medium']['url']}
                    serializer = YoutubeDataSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
            except:
                pass

    def get_queryset(self):
        order = self.request.query_params.get('order',None)
        if(order == None or order == 'descending'):
            orderby = '-publishedAt'
        else:
            orderby = 'publishedAt'
        return self.queryset.order_by(orderby)
