import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Bookings from './pages/Bookings'
import CreateBooking from './pages/CreateBooking'
import AdminBookings from './pages/AdminBookings'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } />
        <Route path="/create-booking" element={
          <ProtectedRoute>
            <CreateBooking />
          </ProtectedRoute>
        } />
        <Route path="/admin-bookings" element={
          <ProtectedRoute adminOnly>
            <AdminBookings />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App