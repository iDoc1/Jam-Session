from django.contrib import admin
from .models import UserProfile, UserInstrument, ExperienceLevel, Gender, CommitmentLevel


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name')


class ExperienceLevelAdmin(admin.ModelAdmin):
    list_display = ('level', 'rank')


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(UserInstrument)
admin.site.register(ExperienceLevel, ExperienceLevelAdmin)
admin.site.register(Gender)
admin.site.register(CommitmentLevel)
