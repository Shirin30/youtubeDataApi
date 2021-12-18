from apscheduler.schedulers.background import BackgroundScheduler
from youtubesearch.views import YoutubeDataAPI

"""
background worker that keeps fetching data and storing in database with a
10 second gap, asynchronously in background.
"""

def begin():
  data = YoutubeDataAPI() 
  background_sch = BackgroundScheduler()
  background_sch.add_job(data.youtube_data_query, 
                    "interval", 
                    seconds=10,
                    id="data_1",
                    replace_existing=True)

  background_sch.start()