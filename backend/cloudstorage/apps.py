from django.apps import AppConfig


class CloudStorageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cloudstorage'

    def ready(self):
        from cloudstorage.signals import handlers  # noqa: F401
