from django.contrib import admin
from .models import Comment, Post


class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'comment_date')


class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'posted_date')


admin.site.register(Comment, CommentAdmin)
admin.site.register(Post, PostAdmin)
