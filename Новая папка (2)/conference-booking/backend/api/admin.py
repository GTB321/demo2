from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Booking

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('username', 'full_name', 'email', 'phone', 'is_staff', 'get_registration_date')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'full_name', 'email', 'phone')
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Личная информация', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Права доступа', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Важные даты', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'full_name', 'email', 'phone', 'password1', 'password2'),
        }),
    )
    
    readonly_fields = ('date_joined', 'last_login')
    
    def get_registration_date(self, obj):
        return obj.date_joined
    get_registration_date.short_description = 'Дата регистрации'
    get_registration_date.admin_order_field = 'date_joined'

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'room_type', 'start_datetime', 'payment_method', 'status', 'created_at')
    list_filter = ('status', 'room_type', 'payment_method')
    search_fields = ('user__username', 'user__full_name')
    readonly_fields = ('created_at',)
    list_editable = ('status',)
    
    fieldsets = (
        ('Информация о бронировании', {
            'fields': ('user', 'room_type', 'start_datetime', 'payment_method')
        }),
        ('Статус', {
            'fields': ('status',)
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

# Регистрируем модель User с нашим кастомным админом
admin.site.register(User, CustomUserAdmin)