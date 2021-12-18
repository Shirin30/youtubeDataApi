from django.apps import AppConfig


class YoutubesearchConfig(AppConfig):
    name = 'youtubesearch'

    def ready(self):
        print("Background Scheduling Begins ...")
        from .scheduler import background_worker
        background_worker.begin()
