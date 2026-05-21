import React, { useState, useEffect } from 'react'
import { Container, Table, Card, Badge, Spinner, Alert } from 'react-bootstrap'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const Bookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings/')
      setBookings(response.data)
    } catch (error) {
      setError('Ошибка загрузки заявок')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      waiting: 'warning',
      approved: 'success',
      completed: 'secondary'
    }
    const labels = {
      waiting: 'Ожидание',
      approved: 'Одобрена',
      completed: 'Завершена'
    }
    return <Badge bg={variants[status]}>{labels[status]}</Badge>
  }

  const getRoomTypeName = (roomType) => {
    const names = {
      auditorium: 'Аудитория',
      coworking: 'Коворкинг',
      cinema: 'Кинозал'
    }
    return names[roomType] || roomType
  }

  const getPaymentMethodName = (method) => {
    const names = {
      cash: 'Наличные',
      card: 'Банковская карта',
      non_cash: 'Безналичный расчёт'
    }
    return names[method] || method
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Мои заявки на бронирование</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {bookings.length === 0 ? (
            <Alert variant="info">У вас пока нет заявок. Создайте новую заявку!</Alert>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Тип помещения</th>
                  <th>Дата и время</th>
                  <th>Способ оплаты</th>
                  <th>Статус</th>
                  <th>Дата создания</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{getRoomTypeName(booking.room_type)}</td>
                    <td>{new Date(booking.start_datetime).toLocaleString('ru-RU')}</td>
                    <td>{getPaymentMethodName(booking.payment_method)}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>{new Date(booking.created_at).toLocaleString('ru-RU')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Bookings