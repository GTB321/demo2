import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Личный кабинет</h2>
              <p><strong>Логин:</strong> {user.username}</p>
              <p><strong>ФИО:</strong> {user.full_name}</p>
              <p><strong>Телефон:</strong> {user.phone}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Роль:</strong> {user.is_staff ? 'Администратор' : 'Пользователь'}</p>
              <p><strong>Дата регистрации:</strong> {new Date(user.registration_date).toLocaleDateString()}</p>
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={() => navigate('/bookings')}>Мои заявки</Button>
                <Button variant="success" onClick={() => navigate('/create-booking')}>Создать заявку</Button>
                {user.is_staff && (
                  <Button variant="info" onClick={() => window.open('http://localhost:8000/admin', '_blank')}>Django Admin</Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile