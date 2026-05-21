import React from 'react'
import { Card, Button } from 'react-bootstrap'

const RoomCard = ({ room, onBook }) => {
  const icons = {
    'Аудитория': (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="12" rx="2" />
        <line x1="12" y1="15" x2="12" y2="21" />
        <line x1="7" y1="21" x2="17" y2="21" />
        <path d="M7 10l3-3 3 2 4-4" />
      </svg>
    ),
    'Коворкинг': (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" />
        <path d="M8 14V8a4 4 0 0 1 8 0v6" />
        <rect x="10" y="10" width="4" height="4" rx="0.5" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    'Кинозал': (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="14" height="10" rx="2" />
        <circle cx="6" cy="4" r="3" />
        <circle cx="12" cy="4" r="3" />
        <path d="M16 11l6-3v8l-6-3" />
        <circle cx="16" cy="13" r="1" />
      </svg>
    )
  }

  const descriptions = {
    'Аудитория': 'Вместимость до 100 человек, проектор, доска, кондиционер',
    'Коворкинг': 'Рабочие места, Wi-Fi, розетки, зона отдыха, кухня',
    'Кинозал': 'Кинопроектор, звук, комфортные кресла, затемнение'
  }

  return (
    <Card className="h-100 border-0 p-3">
      <Card.Body className="d-flex flex-column align-items-center text-center">
        <div className="d-flex justify-content-center align-items-center mb-4" style={{ 
          width: '96px', 
          height: '96px', 
          borderRadius: '24px', 
          background: 'var(--accent-bg)',
          border: '1px solid var(--accent-border)'
        }}>
          {icons[room]}
        </div>
        <Card.Title className="mb-3">
          <h3>{room}</h3>
        </Card.Title>
        <Card.Text className="mb-4 flex-grow-1">
          {descriptions[room]}
        </Card.Text>
        <Button variant="primary" className="w-100" onClick={() => onBook(room)}>
          Забронировать
        </Button>
      </Card.Body>
    </Card>
  )
}

export default RoomCard