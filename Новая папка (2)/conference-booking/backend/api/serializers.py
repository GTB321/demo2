from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import User, Booking, ROOM_TYPES, PAYMENT_METHODS, STATUS_CHOICES
import re

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'full_name', 'phone', 'email', 'is_staff', 'registration_date')
        read_only_fields = ('registration_date', 'is_staff')
    
    def validate_username(self, value):
        if not re.match(r'^[a-zA-Z0-9]+$', value):
            raise serializers.ValidationError('Логин должен содержать только латиницу и цифры')
        if len(value) < 6:
            raise serializers.ValidationError('Логин должен содержать минимум 6 символов')
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Пользователь с таким логином уже существует')
        return value
    
    def validate_full_name(self, value):
        if not re.match(r'^[а-яА-ЯёЁ\s]+$', value):
            raise serializers.ValidationError('ФИО должно содержать только кириллицу и пробелы')
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Введите корректное ФИО')
        return value.strip()
    
    def validate_phone(self, value):
        pattern = r'^8\(\d{3}\)\d{3}-\d{2}-\d{2}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError('Телефон должен быть в формате 8(999)123-45-67')
        return value
    
    def validate_email(self, value):
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', value):
            raise serializers.ValidationError('Введите корректный email адрес')
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Пользователь с таким email уже существует')
        return value
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Неверный логин или пароль')

class BookingSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(source='user', read_only=True)
    room_type_display = serializers.SerializerMethodField()
    payment_method_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = ('id', 'room_type', 'room_type_display', 
                 'start_datetime', 'payment_method', 'payment_method_display', 
                 'status', 'status_display', 'created_at', 'user_info')
        read_only_fields = ('created_at', 'status', 'user_info')
    
    def get_room_type_display(self, obj):
        return dict(ROOM_TYPES).get(obj.room_type, obj.room_type)
    
    def get_payment_method_display(self, obj):
        return dict(PAYMENT_METHODS).get(obj.payment_method, obj.payment_method)
    
    def get_status_display(self, obj):
        return dict(STATUS_CHOICES).get(obj.status, obj.status)
    
    def validate_start_datetime(self, value):
        from django.utils import timezone
        if value < timezone.now():
            raise serializers.ValidationError('Дата и время не могут быть в прошлом')
        return value