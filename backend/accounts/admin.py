from django.contrib import admin
from .models import UserAccount
from rest_framework_simplejwt import token_blacklist

class UserAccountAdmin(admin.ModelAdmin):
    fields = ['email']

class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):
    """
    Class to allow admin users to delete users even if they have outstanding tokens.
    Borrowed from the following URL:
    https://lightrun.com/answers/jazzband-djangorestframework-simplejwt-cant-delete-users-if-using-token-blacklist-app
    """
    def has_delete_permission(self, *args, **kwargs):
        return True

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)
admin.site.register(UserAccount, UserAccountAdmin)
