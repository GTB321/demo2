from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    full_name = models.CharField('ФИО', max_length=255)
    phone = models.CharField('Телефон', max_length=20)
    email = models.EmailField('Email', unique=True)
    registration_date = models.DateTimeField('Дата регистрации', auto_now_add=True)
    
    REQUIRED_FIELDS = ['full_name', 'phone', 'email']
    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

# Определяем константы ДО класса Booking
ROOM_TYPES = [
    ('auditorium', 'Аудитория'),
    ('coworking', 'Коворкинг'),
    ('cinema', 'Кинозал'),
]

PAYMENT_METHODS = [
    ('cash', 'Наличные'),
    ('card', 'Банковская карта'),
    ('non_cash', 'Безналичный расчёт'),
]

STATUS_CHOICES = [
    ('waiting', 'Ожидание'),
    ('approved', 'Одобрена'),
    ('completed', 'Завершена'),
]

class Booking(models.Model):
    ROOM_TYPES = ROOM_TYPES  # Добавляем атрибут класса
    PAYMENT_METHODS = PAYMENT_METHODS  # Добавляем атрибут класса
    STATUS_CHOICES = STATUS_CHOICES  # Добавляем атрибут класса
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings', verbose_name='Пользователь')
    room_type = models.CharField('Тип помещения', max_length=20, choices=ROOM_TYPES)
    start_datetime = models.DateTimeField('Дата и время начала')
    payment_method = models.CharField('Способ оплаты', max_length=20, choices=PAYMENT_METHODS)
    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='waiting')
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.get_room_type_display()} - {self.start_datetime}"
    
    class Meta:
        verbose_name = 'Бронирование'
        verbose_name_plural = 'Бронирования'
        ordering = ['-created_at']