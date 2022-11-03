from django.contrib import admin
from .models import ProfilePicture, MusicSample


class MusicSampleAdmin(admin.ModelAdmin):
    list_display = ('user', 'title')


admin.site.register(ProfilePicture)
admin.site.register(MusicSample, MusicSampleAdmin)
