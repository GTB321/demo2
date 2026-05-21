import React from 'react'
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar sticky-top py-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '24px' }}>🏢</span>
          <span>Бронирование помещений</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none">
          <span className="navbar-toggler-icon"></span>
        </BootstrapNavbar.Toggle>
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Вход</Nav.Link>
                <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">Личный кабинет</Nav.Link>
                <Nav.Link as={Link} to="/bookings">Мои заявки</Nav.Link>
                <Nav.Link as={Link} to="/create-booking">Новая заявка</Nav.Link>
                {user.is_staff && (
                  <Nav.Link as={Link} to="/admin-bookings">📋 Админ-панель</Nav.Link>
                )}
                <Button variant="outline-light" className="ms-2" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar