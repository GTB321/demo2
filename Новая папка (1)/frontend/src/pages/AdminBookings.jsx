import React, { useState, useEffect } from 'react'
import { Container, Table, Card, Badge, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap'
import api from '../services/api'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    fetchAllBookings()
  }, [])

  const fetchAllBookings = async () => {
    try {
      const response = await api.get('/api/bookings/')
      setBookings(response.data)
    } catch (error) {
      setError('Ошибка загрузки заявок')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (booking) => {
    setSelectedBooking(booking)
    setNewStatus(booking.status)
    setShowModal(true)
  }

  const updateStatus = async () => {
    try {
      await api.patch(`/api/bookings/${selectedBooking.id}/change_status/`, {
        status: newStatus
      })
      await fetchAllBookings()
      setShowModal(false)
    } catch (error) {
      setError('Ошибка при изменении статуса')
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
          <h2 className="text-center mb-4">Управление заявками (Администратор)</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {bookings.length === 0 ? (
            <Alert variant="info">Нет заявок для отображения</Alert>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Пользователь</th>
                  <th>Тип помещения</th>
                  <th>Дата и время</th>
                  <th>Способ оплаты</th>
                  <th>Статус</th>
                  <th>Дата создания</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.user_info?.full_name || booking.user}</td>
                    <td>{getRoomTypeName(booking.room_type)}</td>
                    <td>{new Date(booking.start_datetime).toLocaleString('ru-RU')}</td>
                    <td>{getPaymentMethodName(booking.payment_method)}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>{new Date(booking.created_at).toLocaleString('ru-RU')}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleStatusChange(booking)}
                      >
                        Изменить статус
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Изменение статуса заявки #{selectedBooking?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Статус</Form.Label>
              <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="waiting">Ожидание</option>
                <option value="approved">Одобрена</option>
                <option value="completed">Завершена</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={updateStatus}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AdminBookings