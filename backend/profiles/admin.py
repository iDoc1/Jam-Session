from django.contrib import admin
from .models import UserProfile, UserExperienceLevel


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name')


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(UserExperienceLevel)
