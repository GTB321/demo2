import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Slider from '../components/Slider'
import RoomCard from '../components/RoomCard'

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const roomTypes = ['Аудитория', 'Коворкинг', 'Кинозал']

  const handleBook = (roomType) => {
    if (user) {
      navigate('/create-booking', { state: { roomType } })
    } else {
      navigate('/login')
    }
  }

  return (
    <Container className="py-4">
      <Slider />
      <div className="my-5">
        <h2 className="text-center mb-4" style={{ fontWeight: '800', fontSize: '32px' }}>Типы помещений</h2>
        <Row className="mt-4">
          {roomTypes.map((room, index) => (
            <Col md={4} key={index} className="mb-4">
              <RoomCard room={room} onBook={handleBook} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  )
}

export default Home