import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const CreateBooking = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    room_type: '',
    start_datetime: '',
    payment_method: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Валидация
    if (!formData.room_type) {
      setError('Выберите тип помещения')
      setLoading(false)
      return
    }
    if (!formData.start_datetime) {
      setError('Выберите дату и время')
      setLoading(false)
      return
    }
    if (!formData.payment_method) {
      setError('Выберите способ оплаты')
      setLoading(false)
      return
    }
    
    try {
      console.log('Отправляем данные:', formData) // Для отладки
      const response = await api.post('/api/bookings/', formData)
      console.log('Ответ сервера:', response.data) // Для отладки
      navigate('/bookings')
    } catch (error) {
      console.error('Ошибка:', error.response?.data) // Для отладки
      // Показываем конкретную ошибку от сервера
      if (error.response?.data) {
        const errors = error.response.data
        if (typeof errors === 'object') {
          const errorMessages = Object.values(errors).flat().join(', ')
          setError(errorMessages)
        } else {
          setError(errors)
        }
      } else {
        setError('Ошибка при создании заявки. Проверьте правильность заполнения полей.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Новая заявка</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Тип помещения *</Form.Label>
                  <Form.Select 
                    name="room_type" 
                    value={formData.room_type}
                    onChange={(e) => setFormData({...formData, room_type: e.target.value})} 
                    required
                  >
                    <option value="">Выберите...</option>
                    <option value="auditorium">Аудитория</option>
                    <option value="coworking">Коворкинг</option>
                    <option value="cinema">Кинозал</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Дата и время начала *</Form.Label>
                  <Form.Control 
                    type="datetime-local" 
                    value={formData.start_datetime}
                    onChange={(e) => setFormData({...formData, start_datetime: e.target.value})} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Способ оплаты *</Form.Label>
                  <Form.Select 
                    name="payment_method" 
                    value={formData.payment_method}
                    onChange={(e) => setFormData({...formData, payment_method: e.target.value})} 
                    required
                  >
                    <option value="">Выберите...</option>
                    <option value="cash">Наличные</option>
                    <option value="card">Банковская карта</option>
                    <option value="non_cash">Безналичный расчёт</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Создание...' : 'Создать заявку'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateBooking