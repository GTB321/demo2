import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
      title: 'Современные конференц-залы',
      description: 'Оборудованные всем необходимым для проведения мероприятий'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200',
      title: 'Комфортные коворкинги',
      description: 'Идеальное место для работы и встреч'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
      title: 'Профессиональные кинозалы',
      description: 'Презентации и показы на высшем уровне'
    }
  ]

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="my-4"
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
            <img 
              src={slide.image} 
              alt={slide.title}
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(11, 15, 23, 0.9) 0%, rgba(11, 15, 23, 0.4) 50%, rgba(11, 15, 23, 0.15) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '60px',
              textAlign: 'left'
            }}>
              <h2 style={{ 
                color: '#ffffff', 
                fontSize: '36px', 
                fontWeight: '800', 
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                textShadow: 'none'
              }}>{slide.title}</h2>
              <p style={{ 
                color: '#cbd5e1', 
                fontSize: '18px', 
                fontWeight: '400',
                maxWidth: '600px',
                lineHeight: '1.6',
                textShadow: 'none'
              }}>{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider