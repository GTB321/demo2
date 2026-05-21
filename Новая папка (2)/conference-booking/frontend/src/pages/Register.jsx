import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    phone: '',
    email: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '')
      if (value.length > 0 && value[0] !== '8') value = '8' + value
      value = value.slice(0, 11)
      let formatted = '8'
      if (value.length > 1) formatted += '(' + value.slice(1, 4)
      if (value.length > 4) formatted += ')' + value.slice(4, 7)
      if (value.length > 7) formatted += '-' + value.slice(7, 9)
      if (value.length > 9) formatted += '-' + value.slice(9, 11)
      value = formatted
    }
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await register(formData)
    if (result.success) {
      navigate('/profile')
    } else {
      setError('Ошибка регистрации. Проверьте введенные данные.')
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Регистрация</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Логин (латиница, мин 6 символов)</Form.Label>
                  <Form.Control type="text" name="username" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Пароль (мин 8 символов)</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>ФИО (только кириллица)</Form.Label>
                  <Form.Control type="text" name="full_name" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Телефон (8(999)123-45-67)</Form.Label>
                  <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="8(999)123-45-67" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Зарегистрироваться</Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/login">Уже есть аккаунт? Войдите</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register