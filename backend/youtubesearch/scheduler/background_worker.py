from apscheduler.schedulers.background import BackgroundScheduler
from youtubesearch.views import YoutubeDataAPI

def begin():
  data = YoutubeDataAPI() 
  background_sch = BackgroundScheduler()
  background_sch.add_job(data.youtube_data_query, 
                    "interval", 
                    seconds=10,
                    id="data_1",
                    replace_existing=True)

  background_sch.start()